output "public_ip" {
  description = "Dirección IP pública de la instancia EC2"
  value       = aws_instance.terraform_instance.public_ip
}

output "instance_id" {
  description = "ID de la instancia EC2"
  value       = aws_instance.terraform_instance.id
}
