<!-- ABOUT THE PROJECT -->
## About The Project

Simple Authentication Using React & Rails

The main feature for this project is:
- Admin Login
- User Login, Register, Logout, Forgot Password
- Mailer

### Built With
* [Rails 6.1.10](https://guides.rubyonrails.org/v6.1/)
* [ReactJS 17.0.1](https://reactjs.org/versions/)



<!-- GETTING STARTED -->
## Getting Started

### Installation

1. Install Ruby, Rails,
2. Clone the repo
```sh
$ git clone git@github.com:ahmadsyramdani/rails-react-app-sample.git
```
3. Go to project path
```sh
$ cd rails-react-app-sample
```
4. Install Packages
```sh
$ yarn install
$ bundle install
```
5. Create database & migrate
```sh
copy .env.example to .env
$ rake db:create && rake db:migrate && rake db:seed
```


<!-- USAGE EXAMPLES -->
## Run

### Mailcatcher
```sh
$ gem install mailcatcher
$ mailcatcher
```
and open on browser http://127.0.0.1:1080/

### Run app
```sh
$ rails s -p3000
```

<!-- CONTACT -->
## Contact

Ahmad - ahmadsyaripramdani@gmail.com
