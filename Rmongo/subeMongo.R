library(mongolite)
library(jsonlite)
setwd("~/webDev/kversions/k.0.0.1/Rmongo")

# vamos a hacer las pruebas de carga en la coleccion 3 de la base migueldb
# col = "col3"
# db = "migueldb"

# configuracion para mongolab
col = "preguntas"
db = "kmongo"
url = "mongodb://kuser:caoybnh4gMKLqRmgzxYj@ds163667.mlab.com:63667/kmongo"

# abrimos una conexion con mongo
m <- mongo(collection = col, url = url)

# leemos los ficheros que contienen las preguntas y las explicaciones
p <- read.csv("preguntas.csv", head=TRUE, sep=";", fileEncoding = "Latin1")
e <- read.csv("explicaciones.csv", head=TRUE, sep=";", fileEncoding = "Latin1")

# como son pruebas, vamos a borrar lo que haya antes en esa coleccion
m$drop()


# cargamos las preguntas,
m$insert(p[,1:5])

# desfactorizamos las variables de respuesta para que sean cadenas
p[,6]<-as.character(p[,6])
p[,7]<-as.character(p[,7])
p[,8]<-as.character(p[,8])

# ahora vamos a cargar en cada una de ellas las alternativas de respuesta como un vector

for(i in 1:nrow(p)){
  id <- noquote(sprintf('{ "pId" : %d }',i))
  cambio <- noquote(sprintf('{ "$set": {"Respuesta" : %s }}', toJSON(c(p[i,6],p[i,7],p[i,8])) ))
  m$update(id, cambio)
}

# comprobamos que se puede acceder bien a ellas
m$count()
m$find('{ "pId": 2 }')
m$find('{ "Respuesta.2": "Aptitudes" }')

# perfecto
# Ahora vamos a cargar las explicaciones
# acada entrada creamos el objeto explicaciones
for(i in 1:nrow(p)){
  id <- noquote(sprintf('{ "pId" : %d }',i))
  cambio <- noquote(sprintf('{ "$set": {"Explicaciones" : [] }}') )
  m$update(id, cambio)
}

# cargamos todas las explicaciones
p$conta = 0
for(i in 1:nrow(e)){
  id <- noquote(sprintf('{ "pId" : %d }',e[i,"pId"] ))
  tmp <- toJSON(e[i,6])
  campos <- noquote(sprintf('{  "eId" : %d, "Apellido" : "%s", "Nombre" : "%s", "Email" : "%s", "Fecha" : "%s", "Texto": %s, "Votos": %d}',
                                p[e[i,"pId"],"conta"], e[i,"Apellidos"], e[i,"Nombre"], e[i,"Email"],
                                e[i,"Fecha"], tmp, sample(1:10,1)))
  cambio<-  noquote(sprintf('{ "$push": {"Explicaciones" : %s }}', campos ) )
  m$update(id, cambio)
  p[e[i,"pId"],"conta"]=p[e[i,"pId"],"conta"]+1
}

toJSON(m$find('{ "pId": 10 }'))


m$count()

