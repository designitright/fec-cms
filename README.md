**Develop**
[![CircleCI](https://circleci.com/gh/18F/fec-cms.svg?style=svg)](https://circleci.com/gh/18F/fec-cms)

**Master**
[![Dependency Status](https://gemnasium.com/badges/github.com/18F/fec-cms.svg)](https://gemnasium.com/github.com/18F/fec-cms)

## Campaign finance for everyone
The Federal Election Commission (FEC) releases information to the public about
money that’s raised and spent in federal elections — that’s elections for US
President, Senate, and House of Representatives.

Are you interested in seeing how much money a candidate raised? Or spent? How
much debt they took on? Who contributed to their campaign? The FEC is the
authoritative source for that information.

The new FEC.gov is a collaboration between [18F](http://18f.gsa.gov) and the FEC. It
aims to make campaign finance information more accessible (and understandable)
to all users.

## FEC repositories
We welcome you to explore, make suggestions, and contribute to our code.

This repository, fec-cms, houses the content management system (CMS) for
the new FEC.gov.

- [FEC](https://github.com/18F/fec): a general discussion forum. We compile
  [feedback](https://github.com/18F/fec/issues) from the FEC.gov feedback widget
  here, and this is the best place to submit general feedback.
- [openFEC](https://github.com/18F/openfec): the first RESTful API for the Federal Election Commission
- [fec-cms](https://github.com/18F/fec-cms): the content management system
  (CMS) for the new FEC.gov. This project uses [Wagtail](https://github.com/torchbox/wagtail), an open source CMS written
  in Python and built on the Django framework.

## Get involved
We’re thrilled you want to get involved!
- Read our contributing
  [guidelines](https://github.com/18F/openfec/blob/master/CONTRIBUTING.md).
  Then, file an [issue](https://github.com/18F/fec/issues) or submit a pull
  request.
- Send us an email at betafeedback@fec.gov.
- If you're a developer, follow the installation instructions in the
  README.md page of each repository to run the apps on your computer.
- Check out our StoriesonBoard
  [FEC story map](https://18f.storiesonboard.com/m/fec) to get a sense of the
  user needs we'll be addressing in the future.

## Set up
We are always trying to improve our documentation. If you have suggestions or
run into problems please
[file an issue](https://github.com/18F/fec-cms/issues)!

### Project prerequisites
1. Ensure you have the following requirements installed:

    * Python (the latest 3.5 release, which includes `pip` and and a built-in version of `virtualenv` called `venv`).
    * The latest long term support (LTS) or stable release of Node.js (which
      includes `npm`).
    * PostgreSQL (the latest 9.6 release).
         * Read a [Mac OSX tutorial](https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/).
         * Read a [Windows tutorial](http://www.postgresqltutorial.com/install-postgresql/).
         * Read a [Linux tutorial](http://www.postgresql.org/docs/9.5/static/installation.html)
           (or follow your OS package manager).

2. Set up your Node environment — learn how to do this with our
   [Javascript Ecosystem Guide](https://pages.18f.gov/dev-environment-standardization/languages/javascript/).

3. Set up your Python environment — learn how to do this with our
   [Python Ecosystem Guide](https://pages.18f.gov/dev-environment-standardization/languages/python/).

4. Clone this repository.

### Install project dependencies
Use `pip` to install the Python dependencies:

```bash
pip install -r requirements.txt
```

Use `npm` to install JavaScript dependencies:

```bash
npm install
```

### Give default user privileges to create database
If you would like your default user to create the database, alter their user role:
```bash
sudo su - postgres
psql
alter user [default_username] createdb;
\q
exit
```

### Create local databases
Before you can run this project locally, you'll need a development database:

```bash
createdb cfdm_cms_test
```

##### Load our sample data into the local development database:
For details see the section below: Restoring your local database from a backup

### Set environment variables
You will also need to set the environment variables:

#### Set local environment variables
Connection string for the local database as an
environment variable:

```bash
export DATABASE_URL=postgresql://:@/cfdm_cms_test
```

#### running with openFEC API 
By default, `FEC_API_URL` points to the local running instance of the API (http://localhost:5000). 
To set the URL for the API as an environment variable, run:

```bash
export FEC_API_URL=http://localhost:5000
```

Set it to either production, dev, or staging API URLs if you are not running the API locally.

for example: (prod API) https://api.open.fec.gov 
export FEC_API_URL=https://api.open.fec.gov 

The base settings file will read this value in instead of using the default (which is `http://localhost:5000`).


Also set API keys: `FEC_WEB_API_KEY` and `FEC_WEB_API_KEY_PUBLIC`

### Finish project setup
Once all prerequisites and dependencies are installed, you can finish the
project setup by running these commands:

```bash
npm run build
cd fec/
./manage.py migrate
./manage.py createsuperuser
```

## Running the application
In the root project folder, run:

```bash
cd fec/
./manage.py runserver
```

## Front End Development
Front end assets are all located in `/fec/fec/static/*`.

### Icon building
Icons only need to be built if there are new SVG files in the `/fec/fec/static/icons/input` directory, which transforms that SVG file into a SCSS variable to be used on the stylesheets.

``` npm run build-icons ```

### SCSS compilation
``` npm run build-sass ```

### JavaScript compilation
``` npm run build-js ```

### Compilation of both SCSS and JS files
``` npm run build ```

### Command to watch for SCSS and JS changes
``` npm run watch ```


## Running tests
There are two kinds of tests that you can run with the project, Python tests and JavaScript tests.

To run the JavaScript tests, run this command in the root project directory:

```bash
npm run test-single
```

*Note: You may be prompted to allow `node` to accept connections; this is okay and required for the tests to run.*

To run the Python tests, run these commands in the root project directory:

```bash
cd fec/
./manage.py test
```

It's necessary to specify the Postgresql URL, which can be done on the
command line, e.g.:

```bash
env DATABASE_URL=postgresql://:@/cfdm_cms_test ./manage.py test
```

## Enabling/toggling features
[settings/base.py](https://github.com/18F/fec-cms/blob/develop/fec/fec/settings/base.py)
includes a set of `FEATURES` which can also be enabled using environment flags:

```bash
FEC_FEATURE_LEGAL=1 python fec/manage.py runserver
```

## Additional local development instructions

### Watch for static asset changes
To watch for changes to JavaScript files, run this command in the root project directory:

```bash
npm run watch
```

### Restoring your local database from a backup
*Likely only useful for 18F FEC team members*

### Load our sample data into the local development database from a production backup  

first download the web app sample database dump

*18F FEC team can download from the project's google drive folder: CMS DB Backups*

then save the file to a local drive: <path/to/backup_file>

then run this command:

`pg_restore --dbname cfdm_cms_test --no-acl --no-owner <path/to/backup_file>`

Lastly run migrations to account for any very recent changes that are not present in the latest backup 
run this command:
`./manage.py migrate`

## Deploy
*Likely only useful for 18F FEC team members*

We use Travis for automated deploys after tests pass. If you want to deploy something it is much better to push an empty commit with a tag than doing a manual deploy.

If there is a problem with Travis and something needs to be deployed, you can do so with the following commands. Though, you will need to pull the environment variables from the space you are deploying to and remake your static assets. That will ensure things like the links are correct. You will also want to clear your dist/ directory. That way, you will not exceed the alloted space.

Before deploying, install the
[Cloud Foundry CLI](https://docs.cloudfoundry.org/devguide/cf-cli/install-go-cli.html)
and the [autopilot plugin](https://github.com/concourse/autopilot):

```bash
cf install-plugin autopilot -r CF-Community
```

Provision development database:

```bash
cf create-service rds micro-psql fec-rds-stage
```

Provision credentials service:

```bash
cf cups cms-creds-dev -p '{"DJANGO_SECRET_KEY": "..."}'
```

To deploy to Cloud Foundry, run `invoke deploy`. The `deploy` task will
attempt to detect the appropriate Cloud Foundry space based the current
branch; to override, pass the optional `--space` flag:

```bash
invoke deploy --space feature
```

The `deploy` task will use the `FEC_CF_USERNAME` and `FEC_CF_PASSWORD`
environment variables to log in.  If these variables are not provided, you
will be prompted for your Cloud Foundry credentials.

Deploys of a single app can be performed manually by targeting the env/space,
and specifying the corresponding manifest, as well as the app you want, like
so:

```bash
cf target -s [feature|dev|stage|prod] && cf push -f manifest_<[feature|dev|stage|prod]>.yml [api|cms]
```

**NOTE:**  Performing a deploy in this manner will result in a brief period of
downtime.

### A note about deploying to the `feature` space
As noted above, you can manually deploy the application if you specify the space you want to deploy to, e.g., `invoke deploy --space feature`.

In the case of the `feature` space, there are a few things to note:

* To deploy to the feature space, an automated deployer account has been set up. To trigger, go to the `tasks.py` file `DEPLOY_RULES` [here](https://github.com/18F/fec-cms/blob/784e6540cfcec58e6e763fa711de19cdcb475bb7/tasks.py#L74). 
* Only the CMS app is setup and configured for the `feature` space; it points to the `dev` space for all other things (e.g., the API).
* The `feature` version of the CMS does have New Relic running against it.
* The CMS in the `feature` space has its own database that has been loaded with data from a production backup; this data can be refreshed in the future using the same steps outlined in the Wiki.
* The `feature` space has its own S3 bucket for content.

## SSH
*Likely only useful for 18F FEC team members*

You can SSH directly into the running app container to help troubleshoot or inspect things with the instance(s).  Run the following command:

```bash
cf ssh <app name>
```

Where *<app name>* is the name of the application instance you want to connect to.  Once you are logged into the remote secure shell, you'll also want to run this command to setup the shell environment correctly:

```bash
. /home/vcap/app/bin/cf_env_setup.sh
```

More information about using SSH with cloud.dov can be found in the [cloud.gov SSH documentation](https://cloud.gov/docs/apps/using-ssh/#cf-ssh).

## Accounts
Accounts are handled in the cms admin. All accounts will be reviewed annually.


## Licensing and attribution
A few parts of this project are not in the public domain. Attribution and licensing information for those parts are described in detail in [LICENSE.md](LICENSE.md).

The rest of this project is in the worldwide public domain, released under the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/). Read more in [LICENSE.md](LICENSE.md).

A few restrictions limit the way you can use FEC data. For example, you can't
use contributor lists for commercial purposes or to solicit donations.  Learn
more on [FEC.gov](http://FEC.gov).
