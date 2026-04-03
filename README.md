# 🚀 AWS Static Website Architecture (S3 + CloudFront)
**Automated Infrastructure as Code with Terraform**

## 🎯 Project Overview
This project automates the deployment of a high-performance, globally distributed static website. By leveraging **Amazon S3** for durable storage and **Amazon CloudFront** for edge caching, we achieve low-latency content delivery and high availability.

### 🏗️ The Architecture

**Traffic Flow:** User → CloudFront Edge Location (HTTPS) → S3 Bucket (Origin)

* **S3 Bucket:** Acts as the origin server hosting the static assets.
* **CloudFront:** Provides a Global CDN, SSL termination (HTTPS), and reduces load on the S3 bucket.
* **OAC/Policy:** Securely manages public read access to ensure the bucket isn't accidentally exposed to writes.

---

## 📁 Project Structure
```text
.
├── main.tf              # Infrastructure: S3, CloudFront, & Policies
├── providers.tf         # AWS Provider configuration
├── variables.tf         # Parameterized naming and regions
├── outputs.tf           # URL and Distribution ID for easy access
└── www/                 # Application Content
    ├── index.html       # Responsive Frontend
    ├── style.css        # Modern UI Styling
    └── script.js        # Interactive Logic
```

---

## 🚀 Key Technical Features

### **Infrastructure as Code (IaC)**
* **Dynamic MIME Types:** Uses a Terraform `for_each` loop with a `lookup` map to automatically assign correct Content-Types (`text/html`, `text/css`, etc.), preventing browser download prompts.
* **Secure Access:** Implements **S3 Bucket Policies** specifically scoped to allow public read-only access for web hosting.
* **Global Distribution:** Configured with `PriceClass_100` for cost-effective global delivery and automatic HTTP to HTTPS redirection.

### **Frontend Features**
* **Responsive Design:** Mobile-first UI that scales across all devices.
* **State Management:** Includes a Dark/Light mode toggle that persists using browser local storage.
* **AWS Integration:** Custom status indicators showing the health of the deployment.

---

## 📋 Quick Start Guide

### 1. Prerequisites
* AWS CLI configured (`aws configure`).
* Terraform v1.0+ installed.

### 2. Deployment
```bash
# Initialize Terraform and download providers
terraform init

# Review the infrastructure changes
terraform plan

# Deploy to AWS
terraform apply -auto-approve
```

### 3. Accessing the Site
Once the apply is complete, Terraform will output your global URL:
> **Outputs:** `website_url = "https://d123456789.cloudfront.net"`

---

## 🛠️ Resources Created
| Resource | Purpose |
| :--- | :--- |
| **aws_s3_bucket** | Highly durable object storage for web assets. |
| **aws_s3_bucket_policy** | Restricts access to public-read only. |
| **aws_s3_object** | Automates the upload of the `www/` directory. |
| **aws_cloudfront_distribution** | CDN for global caching and SSL (HTTPS). |

---

## 🧹 Cleanup
To avoid ongoing AWS costs (though this fits in Free Tier), run:
```bash
terraform destroy -auto-approve
```

---

## 📚 What I Learned
* **CDN Invalidation:** Understanding how CloudFront caches content at the Edge.
* **IAM & Policies:** Granting the "Least Privilege" access required for web hosting.
* **Terraform Provisioning:** Using `fileset()` to upload multiple website assets in one block.
* **MIME Type Importance:** Why browsers fail to render CSS if the `Content-Type` isn't explicitly set in S3.

## 🎉 Next Steps
Consider extending this project with:

* Custom domain name with Route 53
* SSL certificate with AWS Certificate Manager
* CI/CD pipeline for automatic deployments
* Multiple environments (dev, staging, prod)
* Advanced CloudFront configurations (custom error pages, security headers)


---
Credits: Original architecture inspired by the Tech Tutorials with Piyush AWS Terraform series
