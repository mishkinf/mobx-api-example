mobx-api-example
=====================
### Purpose
A sample mobx-api react application which shows CRUD operations against both a localstorage adapter and a restful JSON rails api. 

### Run the example

```
# clone the sample rails json API that supports the example
git clone git@github.com:mishkinf/rails_api_example.git
cd rails_api_example
bundle install
rails s -p 3001

# clone the mobx-api-example project
git clone git@github.com:mishkinf/mobx-api-example.git
cd mobx-api-example
npm install
npm start
open http://localhost:3000
```
