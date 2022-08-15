# AWS SSM Parameter Store GitHub Action

This GitHub Action allows you to inject parameters into AWS Systems Manager Parameter Store.  
This was created to allow managing environment variables in one place.  
Github environment secrets will be the source of truth.  
When workflow runs it will push Github secrets to SSM so that ECS can pass it to containers.  
We need to use SSM to avoid exposing environment secrets in Task Definition file.

## Example usage

```yaml
- name: Push Secrets to SSM
  uses: Blended-Technologies/aws-ssm-parameter-store@v2
  with:
    secrets: |
      /dev/ui/NEXTAUTH_URL=${{ secrets.NEXTAUTH_URL }}
      /dev/ui/NEXTAUTH_SECRET=${{ secrets.NEXTAUTH_SECRET }}
```

## Required IAM Permissions

In order to use this, your AWS User/Role must allow the `ssm:PutParameter` action.

e.g.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PutSSMParameters",
      "Effect": "Allow",
      "Action": "ssm:PutParameter",
      "Resource": ["arn:aws:ssm:eu-west-1:1234567890:parameter/dev/ui/*"]
    }
  ]
}
```
