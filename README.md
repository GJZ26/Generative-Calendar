# Generative-Calendar
El **Calendario Generativo** es un algoritmo siguiendo el proceso de ***Algoritmo Genético*** para la creación de horarios para estudiantes en estados de irregular.

Esto con el fin de proveer la mejor organización de las materias para aquellos alumnos que deseen un soporte al momento de crear sus horarios.

La siguiente ilustración muestra el funcionamiento general del algoritmo genético.

![Diagrama general algoritmo genético](./docs/images/AG.png)

Puedes leer de forma más detallada el funcionamiento de este algoritmo en el [reporte](./docs/main.pdf) del proyecto.

## Instalación 
```bash
# Crea un entorno virtual
python -m venv tutorial-env

# Habilita el entrono virtual (windows)
env\Scripts\activate

# Instala las dependencias necesarias
pip install -r requirements.txt

# Ejecute el programa
python -m flask --app src/app run
```