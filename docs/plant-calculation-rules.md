# Reglas iniciales de configuracion de planta

La funcion local `calculatePlantNeeds(plantName, phase)` simula la recomendacion de IA con reglas deterministas por fase. Esta firma queda preparada para conectar un servicio externo mas adelante sin cambiar el flujo de la pantalla principal.

| Fase | Luz | Agua | Humedad suelo | Ventilacion | Temperatura | Humedad aire |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Germinacion | 40% | 75% | 80% | 35% | 22 C | 75% |
| Desarrollo | 70% | 60% | 65% | 55% | 24 C | 65% |
| Floracion | 80% | 55% | 60% | 65% | 24 C | 60% |
| Fructificacion | 85% | 70% | 70% | 70% | 25 C | 60% |

La configuracion activa se persiste en AsyncStorage con la key `activePlantConfig` y solo representa una planta activa para todo el invernadero.
