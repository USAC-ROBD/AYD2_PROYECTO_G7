variable "key_name" {
  description = "Nombre de la clave SSH configurada en AWS para acceso"
}

variable "region" {
  description = "Región de AWS"
  default = "us-east-1"
}

variable "access_key" {
  description = "Clave de acceso de AWS"
}

variable "secret_key" {
    description = "Clave secreta de AWS"
}


