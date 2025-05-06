## JustWhatever Main Website
[justwhatever.net](https://justwhatever.net)

### Development

Run `npm run dev` to start a dev server.\
Run `npm run build` to build the website\
Run `npm run start` to run the built the website

### Environment

.env
```dotenv
MONGODB_URI=mongo uri with password etc
AWS_REGION=aws region
AWS_ACCESS=aws iam
AWS_SECRET=aws iam secret
S3_BUCKET=aws s3 bucket name
```

### Database

Using mongodb. Create a da  tabase named `mainWebsite`.\
Inside add a collection named `projects`\
Inside projects you can add a project using the following syntax
```
{
  name: string,
  about: string,
  tags: string[],
  id: string,
  banner: string,
  screenshots: string[],
  registeredTo: string,
  credits: Record<string, string[]>,
  otherCredits: Record<string, string[]>,
  frameworks: string[],
  type: "project" | "work",
  link: string
}
```