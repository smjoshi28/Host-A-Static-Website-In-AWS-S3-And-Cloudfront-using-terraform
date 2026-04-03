 terraform {
    backend "s3" {
      bucket   = "mybucket-sj-terraform-state"
        key    = "dev/terraform.tfstate"
        region = "ca-central-1"
        encrypt = true
        use_lockfile = true
    }
 }
