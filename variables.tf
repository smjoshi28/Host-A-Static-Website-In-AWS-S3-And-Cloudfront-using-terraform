variable "environment" {
    type = string
  default = "dev"
}


variable "region" {
    type = string
  default = "us-east-1"
}

variable "instance_count" {
  description = "Number of EC2 instance to create"
  type = number
}

variable "monitoring_enabled" {
  description = "Enable detailed monitoring for EC2 instance"
  type = bool 
  default = true
}

variable "associate_public_ip" {
  description = "Associate public IP address with EC2 instance"
  type = bool
  default = true
}

variable "cidr_block" {
  description = "CIDR block for the VPC"
  type = list(string)
  default = ["10.0.0.0/8","192.168.0.0/16","172.16.0.0/12"]
}

variable "allowed_vm_types" {
  description = "List of allowed EC2 instance types"
  type = list(string)
  default = ["t2.micro", "t2.small", "t2.medium"]
}

variable "allowed_regions" {
  description = "List of allowed AWS regions"
  type = set(string)
  default = ["us-east-1", "us-west-1", "eu-west-1","eu-west-1"]
}

variable "tags" {
  description = "Tags to apply to resources"
  type = map(string)
  default = {
    
    Name = "dev_instance"
    Environment = "dev"
    created_by = "terraform"
  }
  }

  variable "ingress_values" {
    type = tuple([ number, string, number ])
    default = [ 443, "tcp", 443 ]
  }
variable "config"{
    type = object({
      region = string,
      monitoring = bool,
      instance_count = number
    })
    default = {
      instance_count = 1
      region = "us-east-1"
    monitoring = true
    }
}

variable "bucket_names" {
  description = "Name of the S3 bucket for Terraform state"
  type = list(string)
  default = ["mybucket-sj-terraform-state", "mybucket-sj-terraform-state2"]
}

variable "bucket_name_set" {
  description = "Name of the S3 bucket for Terraform state"
  type = set(string)
  default = ["mybucket-sj-terraform-state0", "mybucket-sj-terraform-state9"]
}

variable "ingress_rules"{
  description = "List of ingress rules for security group"
  type = list(object({
    from_port = number
    to_port = number
    protocol = string
    cidr_blocks = list(string)
    description = string
  }))
  default = [ 
    {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS"
  } ]
}

variable "bucket_name"{
  default = "static-website-bucket-sj"
}