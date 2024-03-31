class Individual:
    def __init__(self, data, quarter):
        print("Initialinzing Individual...")
        self.ordered_data = self.order_by_canonical(data, quarter)
        self.seed_size = self.get_seed_size(self.ordered_data)
        self.seed_base = self.get_seed_base(self.ordered_data)
        self.keys_sorted = self.sort_keys(self.ordered_data)

    def render_schedule(self, seed):
        result = []
        for i in range(self.seed_size):
            char = seed[i]
            if int(char) == 0 or int(char) > len(self.ordered_data[self.keys_sorted[i]]):
                continue
            key = int(char) - 1
            individual = self.ordered_data[self.keys_sorted[i]][key]
            result.append(individual)
        return result

    def order_by_canonical(self, raw_data, quarter):
        result = {}
        for schedule in raw_data:
            temp_entity = schedule
            temp_entity["weight"] = (
                temp_entity["weight"]
                + 1
                + abs(int(temp_entity["quarter"] - int(quarter)))
            )
            if schedule["canonical"] not in result:
                result[schedule["canonical"]] = [temp_entity]
            else:
                result[schedule["canonical"]].append(temp_entity)
        return result

    def get_seed_size(self, data_ordered={}):

        if hasattr(self, "seed_size"):
            return self.seed_size

        return len(data_ordered.keys())

    def get_seed_base(self, data_ordered={}):

        if hasattr(self, "seed_base"):
            return self.seed_base

        result = -1
        for key in data_ordered:
            current_base = len(data_ordered[key])
            if current_base > result:
                result = current_base
        return result

    def sort_keys(self, data_ordered):
        return sorted(data_ordered.keys())

    def calculate_from_list(self, list):
        calculated_data = []

        best_legal = None
        worst_legal = None
        avarage_legal = None

        best_ilegal = None
        worst_ilegal = None
        avarage_ilegal = None

        for x in list:
            calculus_result = self.calculate_from_seed(x)
            if not calculus_result["is_valid"]:

                if avarage_ilegal is None:
                    avarage_ilegal = calculus_result["result"]
                    best_ilegal = calculus_result["result"]
                    worst_ilegal = calculus_result["result"]

                avarage_ilegal += calculus_result["result"]
                best_ilegal = (
                    calculus_result["result"]
                    if calculus_result["result"] > best_ilegal
                    else best_ilegal
                )
                worst_ilegal = (
                    calculus_result["result"]
                    if calculus_result["result"] < worst_ilegal
                    else worst_ilegal
                )

            else:

                if avarage_legal is None:
                    avarage_legal = calculus_result["result"]
                    best_legal = calculus_result["result"]
                    worst_legal = calculus_result["result"]

                avarage_legal += calculus_result["result"]
                best_legal = (
                    calculus_result["result"]
                    if calculus_result["result"] > best_legal
                    else best_legal
                )
                worst_legal = (
                    calculus_result["result"]
                    if calculus_result["result"] < worst_legal
                    else worst_legal
                )

            calculated_data.append(calculus_result)

        calculated_data = sorted(calculated_data, key=self.sort_by_result)
        return {
            "stats": {
                "best_legal": best_legal,
                "avarage_legal": avarage_legal / len(calculated_data)
                if avarage_legal is not None
                else None,
                "worst_legal": worst_legal,
                "best_ilegal": best_ilegal,
                "avarage_ilegal": avarage_ilegal / len(calculated_data)
                if avarage_ilegal is not None
                else None,
                "worst_ilegal": worst_ilegal,
            },
            "log": calculated_data,
        }

    def sort_by_result(self, item):
        return (-item["is_valid"], -item["result"])

    def calculate_from_seed(self, seed):
        hours = []
        total_weight = 0
        is_valid_combination = True
        for i in range(self.seed_size):
            if int(seed[i]) == 0 or int(seed[i]) > len(
                self.ordered_data[self.keys_sorted[i]]
            ):
                continue

            key = int(seed[i]) - 1
            individual = self.ordered_data[self.keys_sorted[i]][key]
            total_weight += individual["weight"]
            is_valid_combination = is_valid_combination and not any(
                elemento in hours for elemento in individual["hours"]
            )
            if is_valid_combination:
                hours.extend(individual["hours"])
        return {"seed": seed, "result": total_weight, "is_valid": is_valid_combination}

    def get_max_possibilities(self):
        max_valued = ''
        for i in range(int(self.seed_size)):
            max_valued += str(self.seed_base)

        return str(int(max_valued, self.seed_base+1))
