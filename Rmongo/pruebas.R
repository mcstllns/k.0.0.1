library(mongolite)
m <- mongo(collection = "diamonds")

# Insert test data
data(diamonds, package="ggplot2")
m$insert(diamonds)
# Check records
m$count()
nrow(diamonds)
# Perform a query and retrieve data
out <- m$find('{"cut" : "Premium", "price" : { "$lt" : 1000 } }')
# Compare
nrow(out)
nrow(subset(diamonds, cut == "Premium" & price < 1000))

# Same as:
data.frame(with(diamonds, table(cut, color)))

# Stream jsonlines into a connection
tmp <- tempfile()
m$export(file(tmp))

# Stream it back in R
library(jsonlite)
mydata <- stream_in(file(tmp))

# Or into mongo
m2 <- mongo("diamonds2")
m2$count()
m2$import(file(tmp))
m2$count()

# Remove the collection
m$drop()
m2$drop()

m$info()



# Mis pruebas
data <- read.table("Respuestas.T1.03.ExplicacionesT1.csv", header=TRUE, sep=";",
                   fileEncoding = "latin1")
data <- data[c(1,2,5,9,12,13)]
names(data) <- c("apellido", "nombre", "email", "fecha", "pregunta", "respuesta")

library(mongolite)
m <- mongo(collection = "preguntas", db = "test")
m$insert(data)

library(jsonlite)

j <- toJSON(data, pretty = TRUE)

