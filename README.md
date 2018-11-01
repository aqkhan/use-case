<p align="center"> 
<img src="https://signatureteam.com/wp-content/themes/singature_theme/images/xsignature_logo.png.pagespeed.ic.gpF041yZfm.webp">
</p>

# Prerequisite
* Nodejs 8 or Above
* NPM 3.5.x or above
* GIT 2.x or above

# Installation
* Run the following commands in your CLI
* `git clone https://github.com/aqkhan/use-case.git`
* `cd use-case`
* `npm install`
* `cd sample-server-json && npm install`
* `cd .. && cd sample-server-json2 && npm install`
* `cd .. && npm start`
* Open in browser [GraphiQL Interface](http://localhost:9999/graphql)

# Example
Copy paste the following code in GraphiQL interface

````
{
  company(id:"1") {
    id
    name
    users{
      id
      firstName
      gender
    }
  }
}
````