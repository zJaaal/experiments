//If you have worked with Express.js you should know what the middlewares are

//So yeah, this is not express at all, but, this is a simple
//implementation of the use method of express

function use(res, req) {
  //Should add validations for arguments
  const [a, b, ...callbacks] = arguments;

  //This function always lives in this closure so it will have the reference to the arguments of the HOC function
  function next() {
    callbacks.shift(1)(res, req, next);
  }

  next();
}

const middleware_1 = (res, req, next) => {
  console.log(res);
  res.a = "I was on middleware 1";
  req.b = "Im going to middleware 2";
  console.log(req);
  next();
};

const middleware_2 = (res, req) => {
  console.log(res);
  res.a = "Im on middleware 2";
  return console.log(res);
};

use({ a: "a" }, { b: "b" }, middleware_1, middleware_2);
