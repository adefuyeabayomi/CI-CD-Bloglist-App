

# 🚀 Hands On GitHub Actions CI-CD Workflow Implementations. 

A hands-on project focused on implementing **CI/CD pipelines using GitHub Actions**.
This repository demonstrates how to automate code quality checks, testing, versioning, and notifications during development.

---

## 📌 Overview

This project is a **Blog Application** integrated with a robust **CI/CD pipeline** to ensure:

* Code quality enforcement (linting)
* Automated testing
* Continuous integration on pull requests and pushes
* Automated version tagging
* Real-time deployment notifications via Discord

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

The pipeline is defined in **GitHub Actions** and runs on:

* Pull Requests → when opened on `master`
* Push → to `master` branch

---

## 🔄 Workflow Breakdown

### 1. ✅ Code Quality & Testing Job (`CodeQualityTest`)

Runs on: `ubuntu-latest`

Steps:

* 📥 Checkout repository
* 🟢 Setup Node.js (`v20.9.0`)
* 📦 Install dependencies
* 🧹 Lint backend code
* 🧹 Lint frontend code
* 🧪 Run automated tests

#### 🔔 Notifications

* ✅ On Success → Sends Discord notification
* ❌ On Failure → Sends Discord alert

---

### 2. 🏷️ Version Tagging Job (`Bump_Tag`)

Runs only when:

* Push to `master`
* Commit message does **NOT** include `#skip`

Depends on: `CodeQualityTest`

Steps:

* 📥 Checkout repository
* 🔖 Automatically bump version (minor by default)
* 🚀 Push Git tag to repository

---

## 🧠 Pipeline Logic

```yaml
- Runs tests before any tagging happens
- Prevents tagging if tests fail
- Skips tagging when commit includes #skip
- Automatically versions releases using semantic versioning
```

---

## 🔔 Notifications Integration

The pipeline integrates with **Discord Webhooks** to provide real-time feedback:

* Success message when deployment passes
* Failure message when pipeline breaks

> ⚠️ Requires `DISCORD_WEBHOOK` secret configured in GitHub

---

## 🔐 Secrets Used

| Secret Name       | Description                      |
| ----------------- | -------------------------------- |
| `DISCORD_WEBHOOK` | Discord webhook for alerts       |
| `GITHUB_TOKEN`    | Default GitHub token for tagging |

 

---

## 🎯 What I Practiced

* GitHub Actions workflow design
* Multi-job pipelines with dependencies
* Conditional execution (`if: success()`, `if: failure()`)
* Automated semantic versioning
* Secure secret management
* External service integration (Discord)

---

## 🚀 Key Takeaways

* CI/CD pipelines help catch issues **before deployment**
* Automation reduces manual errors
* Notifications improve team awareness
* Version tagging keeps releases organized

---

## 👨‍💻 
Built as part of CI/CD practice to strengthen DevOps and automation skills.

---
