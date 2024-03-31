from pprint import pp
from random import randrange, uniform, sample
from libs.Individual import Individual


class GenAlg:
    def load(self, data_as_dict):
        print("Loading...")
        self.preferences = data_as_dict["preferences"]
        self.individuals = Individual(
            data_as_dict["assignatures"], self.preferences["quarter"]
        )

    def run(self):
        print("Initializing...")

        result = self.initialize()
        response = self.optimization_loop(result)

        return {
            "result": response,
            "general": {
                "weight": self.global_best_legal['value'],
                "seed": self.global_best_legal['seed'],
                "possibilities": self.individuals.get_max_possibilities(),
                "seed_size": self.individuals.get_seed_size(),
                "seed_base": self.individuals.get_seed_base()
            },
            "stats":self.stats
        }

    def initialize(self):
        self.invoke_first_generation(
            self.preferences["initial_population"],
            self.individuals.get_seed_size(),
            self.individuals.get_seed_base(),
        )

        return self.individuals.calculate_from_list(self.first_generation)

    def invoke_first_generation(self, size, seed_size, seed_base):
        self.first_generation = []
        print("Generating first generation...")
        for i in range(size):
            result = ""
            for j in range(seed_size):
                result += str(randrange(seed_base + 1))
                pass
            self.first_generation.append(result)

    def save_stats(self, gen):
        self.stats.append(gen["stats"])

        # NO MOVER EL ORDEN DE ESTAS DOS LINEAS
        self.global_best_legal["seed"] = (
            gen["log"][0]["seed"]
            if gen["stats"]["best_legal"] is not None
            and gen["stats"]["best_legal"] > self.global_best_legal["value"]
            else self.global_best_legal["seed"]
        )

        self.global_best_legal["value"] = (
            gen["stats"]["best_legal"]
            if gen["stats"]["best_legal"] is not None
            and gen["stats"]["best_legal"] > self.global_best_legal["value"]
            else self.global_best_legal["value"]
        )

    def optimization_loop(self, first_gen):
        current_generation = first_gen
        self.stats = []
        self.global_best_legal = {"value": -1, "seed": None}
        self.global_worst_legal = {"value": -1, "seed": None}

        self.save_stats(current_generation)

        # Dentro del bucle
        for i in range(self.preferences["generations"]):
            print(f'Generation {i+1} of {self.preferences["generations"]}')

            cross_result = self.cross(current_generation)

            if (
                self.global_best_legal["seed"] is not None
                and self.global_best_legal["seed"] not in cross_result
            ):
                cross_result[randrange(0, len(cross_result))] = self.global_best_legal[
                    "seed"
                ]

            current_generation = self.individuals.calculate_from_list(
                cross_result)

            self.save_stats(current_generation)

            if len(cross_result) > self.preferences["maximum_population"]:
                current_generation = self.pruning(current_generation)
                print(len(cross_result))

        # Fuera del bucle
        print(
            f"Mejor especimen: \n\tValor: {self.global_best_legal['value']}\n\tSemilla: {self.global_best_legal['seed']}"
        )
        return self.individuals.render_schedule(self.global_best_legal['seed'])

    def cross(self, data_as_result):
        print("\t* Matching.")
        print("\t* Exchaging Information.")
        print("\t* Mutating Information.")
        individuals = data_as_result["log"]
        result = []

        # Estrategia A2: para cada individuo, se evalúa si se cruzará según un umbral Pc, en caso de que si elegir aleatoriamente la o las parejas
        for i in range(len(individuals)):
            current_individual_seed = individuals[i]["seed"]
            if uniform(0.01, 1.00) <= self.preferences["cross"]:
                result.append(
                    self.information_exchange(
                        individuals[i], individuals[randrange(
                            0, len(individuals))]
                    )
                )

            if uniform(0.01, 1.00) <= self.preferences["mutation_individual"]:
                current_individual_seed = self.mutate(current_individual_seed)
            result.append(current_individual_seed)

        return result

    # Estrategia C2: Múltiples puntos de cruza, para cada pareja a cruzar, se elige aleatoriamente la cantidad de puntos de cruza, luego para cada punto de cruza seleccionar aleatoriamente la posición.
    def information_exchange(self, original, to_cross):
        original_seed = list(original["seed"])
        sample_seed = to_cross["seed"]

        bits_for_exchanges = sample(
            range(len(original_seed)), randrange(1, len(original_seed) + 1)
        )
        for bit in bits_for_exchanges:
            original_seed[bit] = sample_seed[bit]

        return "".join(original_seed)

    # Estrategia M2: (100 %) Intercambio de posición de bits, si un individuo muta se debe elegir aleatoriamente la posición a la que se va a intercambiar.
    def mutate(self, individual):
        result = list(individual)

        for bit in range(len(individual)):
            if uniform(0.01, 1.00) <= self.preferences["mutation_gen"]:
                index = randrange(0, len(result))
                result[bit] = individual[index]
                result[index] = individual[bit]
                pass

        return "".join(result)

    # Estrategia P2: (90 %) Eliminación aleatoria asegurando mantener al mejor individuo de la población.
    def pruning(self, individual):
        maximum_population = self.preferences["maximum_population"] # Este es el valor más grande que debe haber en la población
        current_population = individual["log"] # Este es el array de la población actual
        exceeded_element = abs(len(current_population) - maximum_population) # Es la cantidad de por la cual supera al limite permitido


        items_index_for_deletion = sample(
            range(len(individual["log"])), exceeded_element)

        while(len(current_population) > maximum_population):
            index_to_delete = randrange(0, len(current_population))
            del individual["log"][index_to_delete]

        print("\t* Pruning.")
        return individual

