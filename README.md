# Joan Tolós Site

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Local development

**One-time setup:**

```bash
cp .env.example .env
```

The `.env` file is gitignored. It sets the credentials and sample dashboard data needed to run locally.

**Start the app:**

```bash
# Terminal 1 — builds Angular and rebuilds on file save
npx ng build --watch

# Terminal 2 — start the Express server (after the first build finishes)
node server.js
```

Open **http://localhost:4200**. Log in at `/finance/login` with `local` / `local123`.

Since there is no local database, the dashboard loads from `FINANCE_DASHBOARD_JSON` in `.env`. Saves work for the session but are not persisted — fine for design iteration.

## Mail configuration


The contact form backend now requires these environment variables:

- `MAIL_USER`
- `MAIL_PASS`
- `SITE_EMAIL` (optional, defaults to `MAIL_USER`)
- `SMTP_HOST` (optional, defaults to `smtp.gmail.com`)
- `SMTP_PORT` (optional, defaults to `465`)
- `SMTP_SECURE` (optional, defaults to `true`)

## Private finance dashboard

The private finance area requires these environment variables:

- `AUTH_USERNAME`
- `AUTH_PASSWORD`
- `AUTH_SESSION_SECRET`
- `JSONBIN_API_KEY` — master key from jsonbin.io
- `JSONBIN_BIN_ID` — ID of the bin that holds the dashboard JSON
- `FINANCE_DASHBOARD_JSON` (optional, used locally as read-only sample data when the above are not set)

### JSONBin.io setup (one time)

1. Create a free account at [jsonbin.io](https://jsonbin.io).
2. Go to **API Keys** and copy your **Master Key**.
3. Create the bin with an empty dashboard:

```bash
curl -X POST https://api.jsonbin.io/v3/b \
  -H "Content-Type: application/json" \
  -H "X-Master-Key: YOUR_MASTER_KEY" \
  -H "X-Bin-Name: finance-dashboard" \
  -H "X-Bin-Private: true" \
  -d '{"title":"Savings Dashboard","updatedAt":null,"totalSaved":0,"averageMonthlyQuota":0,"goals":[],"monthlySavings":[],"notes":[]}'
```

4. Copy the `id` from the response — that is your `JSONBIN_BIN_ID`.
5. Set both values as Heroku config vars:

```bash
heroku config:set JSONBIN_API_KEY=your_master_key JSONBIN_BIN_ID=your_bin_id -a <your-heroku-app-name>
```

Once set, all saves from the dashboard are persisted to the bin. If neither variable is present the app falls back to `FINANCE_DASHBOARD_JSON` (read-only).

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
