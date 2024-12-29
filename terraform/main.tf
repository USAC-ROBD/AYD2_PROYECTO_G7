terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.82.2"
    }
  }
}

provider "aws" {
  region     = var.region # Región de AWS
  access_key = var.access_key
  secret_key = var.secret_key
}

# Grupo de seguridad para permitir acceso SSH (22) y HTTP (80)
resource "aws_security_group" "terraform_sg" {
  name        = "terraform-sg"
  description = "Allow SSH and HTTP traffic"

  # Regla para acceso SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Permite acceso SSH desde cualquier IP
  }

  # Regla para acceso HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Permite acceso HTTP desde cualquier IP
  }

  # Reglas de salida
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1" # Permite todo el tráfico de salida
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Instancia EC2
resource "aws_instance" "terraform_instance" {
  ami           = "ami-0e2c8caa4b6378d8c" # AMI de Ubuntu 22.04 en us-east-1 elegible para Free Tier
  instance_type = "t2.micro"              # Tipo de instancia elegible para Free Tier
  key_name      = var.key_name            # Clave SSH configurada en AWS

  # Asocia el grupo de seguridad a la instancia
  vpc_security_group_ids = [aws_security_group.terraform_sg.id]

  tags = {
    Name = "terraform-instance"
  }
}
