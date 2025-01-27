var javascriptBarcodeReader = (function (jimp) {
	'use strict';

	jimp = jimp && jimp.hasOwnProperty('default') ? jimp['default'] : jimp;

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime_1 = createCommonjsModule(function (module) {
	  /**
	   * Copyright (c) 2014-present, Facebook, Inc.
	   *
	   * This source code is licensed under the MIT license found in the
	   * LICENSE file in the root directory of this source tree.
	   */
	  var runtime = function (exports) {

	    var Op = Object.prototype;
	    var hasOwn = Op.hasOwnProperty;
	    var undefined$1; // More compressible than void 0.

	    var $Symbol = typeof Symbol === "function" ? Symbol : {};
	    var iteratorSymbol = $Symbol.iterator || "@@iterator";
	    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	    function wrap(innerFn, outerFn, self, tryLocsList) {
	      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	      var generator = Object.create(protoGenerator.prototype);
	      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
	      // .throw, and .return methods.

	      generator._invoke = makeInvokeMethod(innerFn, self, context);
	      return generator;
	    }

	    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
	    // record like context.tryEntries[i].completion. This interface could
	    // have been (and was previously) designed to take a closure to be
	    // invoked without arguments, but in all the cases we care about we
	    // already have an existing method we want to call, so there's no need
	    // to create a new function object. We can even get away with assuming
	    // the method takes exactly one argument, since that happens to be true
	    // in every case, so we don't have to touch the arguments object. The
	    // only additional allocation required is the completion record, which
	    // has a stable shape and so hopefully should be cheap to allocate.

	    function tryCatch(fn, obj, arg) {
	      try {
	        return {
	          type: "normal",
	          arg: fn.call(obj, arg)
	        };
	      } catch (err) {
	        return {
	          type: "throw",
	          arg: err
	        };
	      }
	    }

	    var GenStateSuspendedStart = "suspendedStart";
	    var GenStateSuspendedYield = "suspendedYield";
	    var GenStateExecuting = "executing";
	    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
	    // breaking out of the dispatch switch statement.

	    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
	    // .constructor.prototype properties for functions that return Generator
	    // objects. For full spec compliance, you may wish to configure your
	    // minifier not to mangle the names of these two functions.

	    function Generator() {}

	    function GeneratorFunction() {}

	    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
	    // don't natively support it.


	    var IteratorPrototype = {};

	    IteratorPrototype[iteratorSymbol] = function () {
	      return this;
	    };

	    var getProto = Object.getPrototypeOf;
	    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	      // This environment has a native %IteratorPrototype%; use it instead
	      // of the polyfill.
	      IteratorPrototype = NativeIteratorPrototype;
	    }

	    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	    GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	    GeneratorFunctionPrototype.constructor = GeneratorFunction;
	    GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
	    // Iterator interface in terms of a single ._invoke method.

	    function defineIteratorMethods(prototype) {
	      ["next", "throw", "return"].forEach(function (method) {
	        prototype[method] = function (arg) {
	          return this._invoke(method, arg);
	        };
	      });
	    }

	    exports.isGeneratorFunction = function (genFun) {
	      var ctor = typeof genFun === "function" && genFun.constructor;
	      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
	      // do is to check its .name property.
	      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	    };

	    exports.mark = function (genFun) {
	      if (Object.setPrototypeOf) {
	        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	      } else {
	        genFun.__proto__ = GeneratorFunctionPrototype;

	        if (!(toStringTagSymbol in genFun)) {
	          genFun[toStringTagSymbol] = "GeneratorFunction";
	        }
	      }

	      genFun.prototype = Object.create(Gp);
	      return genFun;
	    }; // Within the body of any async function, `await x` is transformed to
	    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	    // `hasOwn.call(value, "__await")` to determine if the yielded value is
	    // meant to be awaited.


	    exports.awrap = function (arg) {
	      return {
	        __await: arg
	      };
	    };

	    function AsyncIterator(generator) {
	      function invoke(method, arg, resolve, reject) {
	        var record = tryCatch(generator[method], generator, arg);

	        if (record.type === "throw") {
	          reject(record.arg);
	        } else {
	          var result = record.arg;
	          var value = result.value;

	          if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
	            return Promise.resolve(value.__await).then(function (value) {
	              invoke("next", value, resolve, reject);
	            }, function (err) {
	              invoke("throw", err, resolve, reject);
	            });
	          }

	          return Promise.resolve(value).then(function (unwrapped) {
	            // When a yielded Promise is resolved, its final value becomes
	            // the .value of the Promise<{value,done}> result for the
	            // current iteration.
	            result.value = unwrapped;
	            resolve(result);
	          }, function (error) {
	            // If a rejected Promise was yielded, throw the rejection back
	            // into the async generator function so it can be handled there.
	            return invoke("throw", error, resolve, reject);
	          });
	        }
	      }

	      var previousPromise;

	      function enqueue(method, arg) {
	        function callInvokeWithMethodAndArg() {
	          return new Promise(function (resolve, reject) {
	            invoke(method, arg, resolve, reject);
	          });
	        }

	        return previousPromise = // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
	        // invocations of the iterator.
	        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	      } // Define the unified helper method that is used to implement .next,
	      // .throw, and .return (see defineIteratorMethods).


	      this._invoke = enqueue;
	    }

	    defineIteratorMethods(AsyncIterator.prototype);

	    AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	      return this;
	    };

	    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
	    // AsyncIterator objects; they just return a Promise for the value of
	    // the final result produced by the iterator.

	    exports.async = function (innerFn, outerFn, self, tryLocsList) {
	      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function (result) {
	        return result.done ? result.value : iter.next();
	      });
	    };

	    function makeInvokeMethod(innerFn, self, context) {
	      var state = GenStateSuspendedStart;
	      return function invoke(method, arg) {
	        if (state === GenStateExecuting) {
	          throw new Error("Generator is already running");
	        }

	        if (state === GenStateCompleted) {
	          if (method === "throw") {
	            throw arg;
	          } // Be forgiving, per 25.3.3.3.3 of the spec:
	          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


	          return doneResult();
	        }

	        context.method = method;
	        context.arg = arg;

	        while (true) {
	          var delegate = context.delegate;

	          if (delegate) {
	            var delegateResult = maybeInvokeDelegate(delegate, context);

	            if (delegateResult) {
	              if (delegateResult === ContinueSentinel) continue;
	              return delegateResult;
	            }
	          }

	          if (context.method === "next") {
	            // Setting context._sent for legacy support of Babel's
	            // function.sent implementation.
	            context.sent = context._sent = context.arg;
	          } else if (context.method === "throw") {
	            if (state === GenStateSuspendedStart) {
	              state = GenStateCompleted;
	              throw context.arg;
	            }

	            context.dispatchException(context.arg);
	          } else if (context.method === "return") {
	            context.abrupt("return", context.arg);
	          }

	          state = GenStateExecuting;
	          var record = tryCatch(innerFn, self, context);

	          if (record.type === "normal") {
	            // If an exception is thrown from innerFn, we leave state ===
	            // GenStateExecuting and loop back for another invocation.
	            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	            if (record.arg === ContinueSentinel) {
	              continue;
	            }

	            return {
	              value: record.arg,
	              done: context.done
	            };
	          } else if (record.type === "throw") {
	            state = GenStateCompleted; // Dispatch the exception by looping back around to the
	            // context.dispatchException(context.arg) call above.

	            context.method = "throw";
	            context.arg = record.arg;
	          }
	        }
	      };
	    } // Call delegate.iterator[context.method](context.arg) and handle the
	    // result, either by returning a { value, done } result from the
	    // delegate iterator, or by modifying context.method and context.arg,
	    // setting context.delegate to null, and returning the ContinueSentinel.


	    function maybeInvokeDelegate(delegate, context) {
	      var method = delegate.iterator[context.method];

	      if (method === undefined$1) {
	        // A .throw or .return when the delegate iterator has no .throw
	        // method always terminates the yield* loop.
	        context.delegate = null;

	        if (context.method === "throw") {
	          // Note: ["return"] must be used for ES3 parsing compatibility.
	          if (delegate.iterator["return"]) {
	            // If the delegate iterator has a return method, give it a
	            // chance to clean up.
	            context.method = "return";
	            context.arg = undefined$1;
	            maybeInvokeDelegate(delegate, context);

	            if (context.method === "throw") {
	              // If maybeInvokeDelegate(context) changed context.method from
	              // "return" to "throw", let that override the TypeError below.
	              return ContinueSentinel;
	            }
	          }

	          context.method = "throw";
	          context.arg = new TypeError("The iterator does not provide a 'throw' method");
	        }

	        return ContinueSentinel;
	      }

	      var record = tryCatch(method, delegate.iterator, context.arg);

	      if (record.type === "throw") {
	        context.method = "throw";
	        context.arg = record.arg;
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      var info = record.arg;

	      if (!info) {
	        context.method = "throw";
	        context.arg = new TypeError("iterator result is not an object");
	        context.delegate = null;
	        return ContinueSentinel;
	      }

	      if (info.done) {
	        // Assign the result of the finished delegate to the temporary
	        // variable specified by delegate.resultName (see delegateYield).
	        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

	        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
	        // exception, let the outer generator proceed normally. If
	        // context.method was "next", forget context.arg since it has been
	        // "consumed" by the delegate iterator. If context.method was
	        // "return", allow the original .return call to continue in the
	        // outer generator.

	        if (context.method !== "return") {
	          context.method = "next";
	          context.arg = undefined$1;
	        }
	      } else {
	        // Re-yield the result returned by the delegate method.
	        return info;
	      } // The delegate iterator is finished, so forget it and continue with
	      // the outer generator.


	      context.delegate = null;
	      return ContinueSentinel;
	    } // Define Generator.prototype.{next,throw,return} in terms of the
	    // unified ._invoke helper method.


	    defineIteratorMethods(Gp);
	    Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
	    // @@iterator function is called on it. Some browsers' implementations of the
	    // iterator prototype chain incorrectly implement this, causing the Generator
	    // object to not be returned from this call. This ensures that doesn't happen.
	    // See https://github.com/facebook/regenerator/issues/274 for more details.

	    Gp[iteratorSymbol] = function () {
	      return this;
	    };

	    Gp.toString = function () {
	      return "[object Generator]";
	    };

	    function pushTryEntry(locs) {
	      var entry = {
	        tryLoc: locs[0]
	      };

	      if (1 in locs) {
	        entry.catchLoc = locs[1];
	      }

	      if (2 in locs) {
	        entry.finallyLoc = locs[2];
	        entry.afterLoc = locs[3];
	      }

	      this.tryEntries.push(entry);
	    }

	    function resetTryEntry(entry) {
	      var record = entry.completion || {};
	      record.type = "normal";
	      delete record.arg;
	      entry.completion = record;
	    }

	    function Context(tryLocsList) {
	      // The root entry object (effectively a try statement without a catch
	      // or a finally block) gives us a place to store values thrown from
	      // locations where there is no enclosing try statement.
	      this.tryEntries = [{
	        tryLoc: "root"
	      }];
	      tryLocsList.forEach(pushTryEntry, this);
	      this.reset(true);
	    }

	    exports.keys = function (object) {
	      var keys = [];

	      for (var key in object) {
	        keys.push(key);
	      }

	      keys.reverse(); // Rather than returning an object with a next method, we keep
	      // things simple and return the next function itself.

	      return function next() {
	        while (keys.length) {
	          var key = keys.pop();

	          if (key in object) {
	            next.value = key;
	            next.done = false;
	            return next;
	          }
	        } // To avoid creating an additional object, we just hang the .value
	        // and .done properties off the next function object itself. This
	        // also ensures that the minifier will not anonymize the function.


	        next.done = true;
	        return next;
	      };
	    };

	    function values(iterable) {
	      if (iterable) {
	        var iteratorMethod = iterable[iteratorSymbol];

	        if (iteratorMethod) {
	          return iteratorMethod.call(iterable);
	        }

	        if (typeof iterable.next === "function") {
	          return iterable;
	        }

	        if (!isNaN(iterable.length)) {
	          var i = -1,
	              next = function next() {
	            while (++i < iterable.length) {
	              if (hasOwn.call(iterable, i)) {
	                next.value = iterable[i];
	                next.done = false;
	                return next;
	              }
	            }

	            next.value = undefined$1;
	            next.done = true;
	            return next;
	          };

	          return next.next = next;
	        }
	      } // Return an iterator with no values.


	      return {
	        next: doneResult
	      };
	    }

	    exports.values = values;

	    function doneResult() {
	      return {
	        value: undefined$1,
	        done: true
	      };
	    }

	    Context.prototype = {
	      constructor: Context,
	      reset: function (skipTempReset) {
	        this.prev = 0;
	        this.next = 0; // Resetting context._sent for legacy support of Babel's
	        // function.sent implementation.

	        this.sent = this._sent = undefined$1;
	        this.done = false;
	        this.delegate = null;
	        this.method = "next";
	        this.arg = undefined$1;
	        this.tryEntries.forEach(resetTryEntry);

	        if (!skipTempReset) {
	          for (var name in this) {
	            // Not sure about the optimal order of these conditions:
	            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	              this[name] = undefined$1;
	            }
	          }
	        }
	      },
	      stop: function () {
	        this.done = true;
	        var rootEntry = this.tryEntries[0];
	        var rootRecord = rootEntry.completion;

	        if (rootRecord.type === "throw") {
	          throw rootRecord.arg;
	        }

	        return this.rval;
	      },
	      dispatchException: function (exception) {
	        if (this.done) {
	          throw exception;
	        }

	        var context = this;

	        function handle(loc, caught) {
	          record.type = "throw";
	          record.arg = exception;
	          context.next = loc;

	          if (caught) {
	            // If the dispatched exception was caught by a catch block,
	            // then let that catch block handle the exception normally.
	            context.method = "next";
	            context.arg = undefined$1;
	          }

	          return !!caught;
	        }

	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];
	          var record = entry.completion;

	          if (entry.tryLoc === "root") {
	            // Exception thrown outside of any try block that could handle
	            // it, so set the completion value of the entire function to
	            // throw the exception.
	            return handle("end");
	          }

	          if (entry.tryLoc <= this.prev) {
	            var hasCatch = hasOwn.call(entry, "catchLoc");
	            var hasFinally = hasOwn.call(entry, "finallyLoc");

	            if (hasCatch && hasFinally) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              } else if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else if (hasCatch) {
	              if (this.prev < entry.catchLoc) {
	                return handle(entry.catchLoc, true);
	              }
	            } else if (hasFinally) {
	              if (this.prev < entry.finallyLoc) {
	                return handle(entry.finallyLoc);
	              }
	            } else {
	              throw new Error("try statement without catch or finally");
	            }
	          }
	        }
	      },
	      abrupt: function (type, arg) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	            var finallyEntry = entry;
	            break;
	          }
	        }

	        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	          // Ignore the finally entry if control is not jumping to a
	          // location outside the try/catch block.
	          finallyEntry = null;
	        }

	        var record = finallyEntry ? finallyEntry.completion : {};
	        record.type = type;
	        record.arg = arg;

	        if (finallyEntry) {
	          this.method = "next";
	          this.next = finallyEntry.finallyLoc;
	          return ContinueSentinel;
	        }

	        return this.complete(record);
	      },
	      complete: function (record, afterLoc) {
	        if (record.type === "throw") {
	          throw record.arg;
	        }

	        if (record.type === "break" || record.type === "continue") {
	          this.next = record.arg;
	        } else if (record.type === "return") {
	          this.rval = this.arg = record.arg;
	          this.method = "return";
	          this.next = "end";
	        } else if (record.type === "normal" && afterLoc) {
	          this.next = afterLoc;
	        }

	        return ContinueSentinel;
	      },
	      finish: function (finallyLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.finallyLoc === finallyLoc) {
	            this.complete(entry.completion, entry.afterLoc);
	            resetTryEntry(entry);
	            return ContinueSentinel;
	          }
	        }
	      },
	      "catch": function (tryLoc) {
	        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	          var entry = this.tryEntries[i];

	          if (entry.tryLoc === tryLoc) {
	            var record = entry.completion;

	            if (record.type === "throw") {
	              var thrown = record.arg;
	              resetTryEntry(entry);
	            }

	            return thrown;
	          }
	        } // The context.catch method must only be called with a location
	        // argument that corresponds to a known catch block.


	        throw new Error("illegal catch attempt");
	      },
	      delegateYield: function (iterable, resultName, nextLoc) {
	        this.delegate = {
	          iterator: values(iterable),
	          resultName: resultName,
	          nextLoc: nextLoc
	        };

	        if (this.method === "next") {
	          // Deliberately forget the last sent value so that we don't
	          // accidentally pass it on to the delegate.
	          this.arg = undefined$1;
	        }

	        return ContinueSentinel;
	      }
	    }; // Regardless of whether this script is executing as a CommonJS module
	    // or not, return the runtime object so that we can declare the variable
	    // regeneratorRuntime in the outer scope, which allows this module to be
	    // injected easily by `bin/regenerator --include-runtime script.js`.

	    return exports;
	  }( // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports );

	  try {
	    regeneratorRuntime = runtime;
	  } catch (accidentalStrictMode) {
	    // This module should not be running in strict mode, so the above
	    // assignment should always work unless something is misconfigured. Just
	    // in case runtime.js accidentally runs in strict mode, we can escape
	    // strict mode using a global Function call. This could conceivably fail
	    // if a Content Security Policy forbids using Function, but in that case
	    // the proper solution is to fix the accidental strict mode problem. If
	    // you've misconfigured your bundler to force strict mode and applied a
	    // CSP to forbid Function, and you're not willing to fix either of those
	    // problems, please detail your unique predicament in a GitHub issue.
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	});

	var regenerator = runtime_1;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	var asyncToGenerator = _asyncToGenerator;

	var _typeof_1 = createCommonjsModule(function (module) {
	  function _typeof2(obj) {
	    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	      _typeof2 = function _typeof2(obj) {
	        return typeof obj;
	      };
	    } else {
	      _typeof2 = function _typeof2(obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	      };
	    }

	    return _typeof2(obj);
	  }

	  function _typeof(obj) {
	    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
	      module.exports = _typeof = function _typeof(obj) {
	        return _typeof2(obj);
	      };
	    } else {
	      module.exports = _typeof = function _typeof(obj) {
	        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
	      };
	    }

	    return _typeof(obj);
	  }

	  module.exports = _typeof;
	});

	var isNode = (typeof process === "undefined" ? "undefined" : _typeof_1(process)) === 'object' && process.release && process.release.name === 'node'; // check if string is url

	function isUrl(s) {
	  var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
	  return !s[0] === '#' || regexp.test(s);
	}
	/**
	 * Creates image data from HTML image
	 * @param {HTMLImageElement} image HTML Image element
	 */


	function createImageData(image) {
	  var canvas = document.createElement('canvas');
	  var ctx = canvas.getContext('2d');
	  var width = image.naturalWidth;
	  var height = image.naturalHeight;
	  canvas.width = width;
	  canvas.height = height;
	  ctx.drawImage(image, 0, 0);
	  return ctx.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
	}
	/**
	 * Reads image source and returns imageData as only callback parameter
	 * @param {*} source Image source
	 * @param {Function} callback Callback to pass the imageData
	 */


	function getImageDataFromSource(_x) {
	  return _getImageDataFromSource.apply(this, arguments);
	}

	function _getImageDataFromSource() {
	  _getImageDataFromSource = asyncToGenerator(
	  /*#__PURE__*/
	  regenerator.mark(function _callee(source) {
	    var isStringSource, isURLSource, tagName;
	    return regenerator.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            isStringSource = typeof source === 'string';
	            isURLSource = isStringSource ? isUrl(source) : false;
	            tagName = source.tagName;
	            return _context.abrupt("return", new Promise(function (resolve, reject) {
	              // String source
	              if (isStringSource) {
	                // Read file in Node.js
	                if (isNode) {
	                  jimp.read(isURLSource ? {
	                    url: source,
	                    headers: {}
	                  } : source, function (err, image) {
	                    if (err) {
	                      reject(err);
	                    } else {
	                      var _image$bitmap = image.bitmap,
	                          data = _image$bitmap.data,
	                          width = _image$bitmap.width,
	                          height = _image$bitmap.height;
	                      resolve({
	                        data: data.toJSON().data,
	                        width: width,
	                        height: height
	                      });
	                    }
	                  });
	                } else if (isURLSource) {
	                  // Load Image from source
	                  var img = new Image();
	                  img.onerror = reject;

	                  img.onload = function () {
	                    return resolve(createImageData(img));
	                  };

	                  img.src = source;
	                } else {
	                  // Find Elment by ID
	                  var imgElem = document.getElementById(source);

	                  if (imgElem) {
	                    resolve(createImageData(imgElem));
	                  }

	                  reject(new Error('Invalid image source specified!'));
	                }
	              } else if (tagName) {
	                // HTML Image element
	                if (tagName === 'IMG') {
	                  resolve(createImageData(source));
	                } // HTML Canvas element
	                else if (tagName === 'CANVAS') {
	                    resolve(source.getContext('2d').getImageData(0, 0, source.naturalWidth, source.naturalHeight));
	                  }

	                reject(new Error('Invalid image source specified!'));
	              } // Pixel Data
	              else if (source.data && source.width && source.height) {
	                  resolve(source);
	                } else {
	                  reject(new Error('Invalid image source specified!'));
	                }
	            }));

	          case 4:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _getImageDataFromSource.apply(this, arguments);
	}

	function getLines(obj) {
	  var data = obj.data,
	      start = obj.start,
	      end = obj.end,
	      channels = obj.channels,
	      width = obj.width;
	  var pxLine = data.slice(start, end);
	  var sum = [];
	  var bmp = [];
	  var lines = [];
	  var count = 1;
	  var min = 0;
	  var max = 0;
	  var padding = {
	    left: true,
	    right: true // grey scale section and sum of columns pixels in section

	  };

	  for (var row = 0; row < 2; row += 1) {
	    for (var col = 0; col < width; col += 1) {
	      var i = (row * width + col) * channels;
	      var g = (pxLine[i] * 3 + pxLine[i + 1] * 4 + pxLine[i + 2] * 2) / 9;
	      var s = sum[col];
	      pxLine[i] = g;
	      pxLine[i + 1] = g;
	      pxLine[i + 2] = g;
	      sum[col] = g + (s || 0);
	    }
	  }

	  for (var _i = 0; _i < width; _i += 1) {
	    sum[_i] /= 2;
	    var _s = sum[_i];

	    if (_s < min) {
	      min = _s;
	    } else {
	      max = _s;
	    }
	  } // matches columns in two rows


	  var pivot = min + (max - min) / 2;

	  for (var _col = 0; _col < width; _col += 1) {
	    var matches = 0;
	    var value = void 0;

	    for (var _row = 0; _row < 2; _row += 1) {
	      value = pxLine[(_row * width + _col) * channels];

	      if (value > pivot) {
	        matches += 1;
	      }
	    }

	    if (_col === 0 && value <= pivot) padding.left = false;

	    if (_col === width - 1 && value <= pivot) {
	      padding.right = false;
	    }

	    bmp.push(matches > 1);
	  } // matches width of barcode lines


	  var curr = bmp[0];

	  for (var _col2 = 0; _col2 < width; _col2 += 1) {
	    if (bmp[_col2] === curr) {
	      count += 1;

	      if (_col2 === width - 1) {
	        lines.push(count);
	      }
	    } else {
	      lines.push(count);
	      count = 1;
	      curr = bmp[_col2];
	    }
	  }

	  return {
	    lines: lines,
	    padding: padding
	  };
	}

	var utiltities = {
	  getImageDataFromSource: getImageDataFromSource,
	  getLines: getLines
	};

	var WIDTH_TBL = ['212222', '222122', '222221', '121223', '121322', '131222', '122213', '122312', '132212', '221213', '221312', '231212', '112232', '122132', '122231', '113222', '123122', '123221', '223211', '221132', '221231', '213212', '223112', '312131', '311222', '321122', '321221', '312212', '322112', '322211', '212123', '212321', '232121', '111323', '131123', '131321', '112313', '132113', '132311', '211313', '231113', '231311', '112133', '112331', '132131', '113123', '113321', '133121', '313121', '211331', '231131', '213113', '213311', '213131', '311123', '311321', '331121', '312113', '312311', '332111', '314111', '221411', '431111', '111224', '111422', '121124', '121421', '141122', '141221', '112214', '112412', '122114', '122411', '142112', '142211', '241211', '221114', '413111', '241112', '134111', '111242', '121142', '121241', '114212', '124112', '124211', '411212', '421112', '421211', '212141', '214121', '412121', '111143', '111341', '131141', '114113', '114311', '411113', '411311', '113141', '114131', '311141', '411131', '211412', '211214', '211232', '233111', '211133', '2331112'];
	var TBL_A = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', 'NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 'BS', 'HT', 'LF', 'VT', 'FF', 'CR', 'SO', 'SI', 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 'CAN', 'EM', 'SUB', 'ESC', 'FS', 'GS', 'RS', 'US', 'FNC 3', 'FNC 2', 'Shift B', 'Code C', 'Code B', 'FNC 4', 'FNC 1'];
	var TBL_B = [' ', '!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', 'DEL', 'FNC 3', 'FNC 2', 'Shift A', 'Code C', 'FNC 4', 'Code A', 'FNC 1'];
	var TBL_C = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', 'Code B', 'Code A', 'FNC 1'];

	var computeGroup = function computeGroup(lines) {
	  // sum of a group in code-128 must be 11
	  var factor = lines.reduce(function (pre, item) {
	    return pre + item;
	  }, 0) / 11; //

	  return lines.map(function (item) {
	    return Math.round(item / factor);
	  }).join('');
	};

	var code128 = function code128(lines) {
	  var lookupTBL;
	  var sumOP;
	  var letterKey;
	  var letterCode;
	  var keyIndex;
	  var code = []; // extract terminal bar

	  lines.pop();
	  var seq = lines.slice(0);
	  letterKey = computeGroup(seq.splice(0, 6));

	  switch (letterKey) {
	    case '211214':
	      lookupTBL = TBL_B;
	      sumOP = 104;
	      break;

	    case '211232':
	      lookupTBL = TBL_C;
	      sumOP = 105;
	      break;

	    default:
	      lookupTBL = TBL_A;
	      sumOP = 103;
	      break;
	  }

	  for (var i = 1; seq.length > 12; i += 1) {
	    letterKey = computeGroup(seq.splice(0, 6));
	    keyIndex = WIDTH_TBL.indexOf(letterKey);
	    sumOP += i * keyIndex;
	    letterCode = lookupTBL[keyIndex];

	    switch (letterCode) {
	      case 'Code A':
	        lookupTBL = TBL_A;
	        break;

	      case 'Code B':
	        lookupTBL = TBL_B;
	        break;

	      case 'Code C':
	        lookupTBL = TBL_C;
	        break;

	      default:
	        code.push(letterCode);
	        break;
	    }
	  }

	  letterKey = computeGroup(seq.splice(0, 6));
	  if (sumOP % 103 !== WIDTH_TBL.indexOf(letterKey)) return null;
	  return code.join('');
	};

	var CHAR_SET = ['nnwwn', 'wnnnw', 'nwnnw', 'wwnnn', 'nnwnw', 'wnwnn', 'nwwnn', 'nnnww', 'wnnwn', 'nwnwn'];

	var _2of5 = function _2of5(lines) {
	  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'standard';
	  var code = [];
	  var barThreshold = Math.ceil(lines.reduce(function (pre, item) {
	    return (pre + item) / 2;
	  }, 0));

	  if (type === 'interleaved') {
	    // extract start/ends pair
	    var startChar = lines.splice(0, 4).map(function (line) {
	      return line > barThreshold ? 'w' : 'n';
	    }).join('');
	    var endChar = lines.splice(lines.length - 3, 3).map(function (line) {
	      return line > barThreshold ? 'w' : 'n';
	    }).join('');
	    if (startChar !== 'nnnn' || endChar !== 'wnn') return null; // Read one encoded character at a time.

	    while (lines.length > 0) {
	      var seg = lines.splice(0, 10);
	      var a = seg.filter(function (item, index) {
	        return index % 2 === 0;
	      }).map(function (line) {
	        return line > barThreshold ? 'w' : 'n';
	      }).join('');
	      code.push(CHAR_SET.indexOf(a));
	      var b = seg.filter(function (item, index) {
	        return index % 2 !== 0;
	      }).map(function (line) {
	        return line > barThreshold ? 'w' : 'n';
	      }).join('');
	      code.push(CHAR_SET.indexOf(b));
	    }
	  } else if (type === 'standard') {
	    // extract start/ends pair
	    var _startChar = lines.splice(0, 6).filter(function (item, index) {
	      return index % 2 === 0;
	    }).map(function (line) {
	      return line > barThreshold ? 'w' : 'n';
	    }).join('');

	    var _endChar = lines.splice(lines.length - 5, 5).filter(function (item, index) {
	      return index % 2 === 0;
	    }).map(function (line) {
	      return line > barThreshold ? 'w' : 'n';
	    }).join('');

	    if (_startChar !== 'wwn' || _endChar !== 'wnw') return null; // Read one encoded character at a time.

	    while (lines.length > 0) {
	      var _a = lines.splice(0, 10).filter(function (item, index) {
	        return index % 2 === 0;
	      }).map(function (line) {
	        return line > barThreshold ? 'w' : 'n';
	      }).join('');

	      code.push(CHAR_SET.indexOf(_a));
	    }
	  }

	  return code.join('');
	};

	var CHAR_SET$1 = {
	  nnnwwnwnn: '0',
	  wnnwnnnnw: '1',
	  nnwwnnnnw: '2',
	  wnwwnnnnn: '3',
	  nnnwwnnnw: '4',
	  wnnwwnnnn: '5',
	  nnwwwnnnn: '6',
	  nnnwnnwnw: '7',
	  wnnwnnwnn: '8',
	  nnwwnnwnn: '9',
	  wnnnnwnnw: 'A',
	  nnwnnwnnw: 'B',
	  wnwnnwnnn: 'C',
	  nnnnwwnnw: 'D',
	  wnnnwwnnn: 'E',
	  nnwnwwnnn: 'F',
	  nnnnnwwnw: 'G',
	  wnnnnwwnn: 'H',
	  nnwnnwwnn: 'I',
	  nnnnwwwnn: 'J',
	  wnnnnnnww: 'K',
	  nnwnnnnww: 'L',
	  wnwnnnnwn: 'M',
	  nnnnwnnww: 'N',
	  wnnnwnnwn: 'O',
	  nnwnwnnwn: 'P',
	  nnnnnnwww: 'Q',
	  wnnnnnwwn: 'R',
	  nnwnnnwwn: 'S',
	  nnnnwnwwn: 'T',
	  wwnnnnnnw: 'U',
	  nwwnnnnnw: 'V',
	  wwwnnnnnn: 'W',
	  nwnnwnnnw: 'X',
	  wwnnwnnnn: 'Y',
	  nwwnwnnnn: 'Z',
	  nwnnnnwnw: '-',
	  wwnnnnwnn: '.',
	  nwwnnnwnn: ' ',
	  nwnwnwnnn: '$',
	  nwnwnnnwn: '/',
	  nwnnnwnwn: '+',
	  nnnwnwnwn: '%',
	  nwnnwnwnn: '*'
	};

	var code39 = function code39(lines) {
	  var code = [];
	  var barThreshold = Math.ceil(lines.reduce(function (pre, item) {
	    return pre + item;
	  }, 0) / lines.length); // Read one encoded character at a time.

	  while (lines.length > 0) {
	    var sequenceBar = lines.splice(0, 10).map(function (line) {
	      return line > barThreshold ? 'w' : 'n';
	    });
	    code.push(CHAR_SET$1[sequenceBar.slice(0, 9).join('')]);
	  }

	  if (code.pop() !== '*' || code.shift() !== '*') return null;
	  return code.join('');
	};

	var CHAR_SET$2 = [{
	  '100010100': '0'
	}, {
	  '101001000': '1'
	}, {
	  '101000100': '2'
	}, {
	  '101000010': '3'
	}, {
	  '100101000': '4'
	}, {
	  '100100100': '5'
	}, {
	  '100100010': '6'
	}, {
	  '101010000': '7'
	}, {
	  '100010010': '8'
	}, {
	  '100001010': '9'
	}, {
	  '110101000': 'A'
	}, {
	  '110100100': 'B'
	}, {
	  '110100010': 'C'
	}, {
	  '110010100': 'D'
	}, {
	  '110010010': 'E'
	}, {
	  '110001010': 'F'
	}, {
	  '101101000': 'G'
	}, {
	  '101100100': 'H'
	}, {
	  '101100010': 'I'
	}, {
	  '100110100': 'J'
	}, {
	  '100011010': 'K'
	}, {
	  '101011000': 'L'
	}, {
	  '101001100': 'M'
	}, {
	  '101000110': 'N'
	}, {
	  '100101100': 'O'
	}, {
	  '100010110': 'P'
	}, {
	  '110110100': 'Q'
	}, {
	  '110110010': 'R'
	}, {
	  '110101100': 'S'
	}, {
	  '110100110': 'T'
	}, {
	  '110010110': 'U'
	}, {
	  '110011010': 'V'
	}, {
	  '101101100': 'W'
	}, {
	  '101100110': 'X'
	}, {
	  '100110110': 'Y'
	}, {
	  '100111010': 'Z'
	}, {
	  '100101110': '-'
	}, {
	  '111010100': '.'
	}, {
	  '111010010': ' '
	}, {
	  '111001010': '$'
	}, {
	  '101101110': '/'
	}, {
	  '101110110': '+'
	}, {
	  '110101110': '%'
	}, {
	  '100100110': '($)'
	}, {
	  '111011010': '(%)'
	}, {
	  '111010110': '(/)'
	}, {
	  '100110010': '(+)'
	}, {
	  '101011110': '*'
	}];

	var code93 = function code93(lines) {
	  var code = [];
	  var binary = []; // remove termination bar

	  lines.pop();
	  var barThreshold = Math.ceil(lines.reduce(function (pre, item) {
	    return pre + item;
	  }, 0) / lines.length);
	  var minBarWidth = Math.ceil(lines.reduce(function (pre, item) {
	    if (item < barThreshold) return (pre + item) / 2;
	    return pre;
	  }, 0)); // leave the padded *

	  for (var i = 0; i < lines.length; i += 1) {
	    var segment = lines[i];

	    while (segment > 0) {
	      if (i % 2 === 0) {
	        binary.push(1);
	      } else {
	        binary.push(0);
	      }

	      segment -= minBarWidth;
	    }
	  }

	  var _loop = function _loop(_i) {
	    var searcKey = binary.slice(_i, _i + 9).join('');
	    var char = CHAR_SET$2.filter(function (item) {
	      return Object.keys(item)[0] === searcKey;
	    });
	    code.push(char[0][searcKey]);
	  };

	  for (var _i = 0; _i < binary.length; _i += 9) {
	    _loop(_i);
	  }

	  if (code.shift() !== '*' || code.pop() !== '*') return null;
	  var K = code.pop();
	  var sum = 0;
	  var letter;
	  var Value;

	  var findValue = function findValue(item) {
	    return Object.values(item)[0] === letter;
	  };

	  for (var _i2 = code.length - 1; _i2 >= 0; _i2 -= 1) {
	    letter = code[_i2];
	    Value = CHAR_SET$2.indexOf(CHAR_SET$2.filter(findValue)[0]);
	    sum += Value * (1 + (code.length - (_i2 + 1)) % 20);
	  }

	  if (Object.values(CHAR_SET$2[sum % 47])[0] !== K) return null;
	  var C = code.pop();
	  sum = 0;

	  for (var _i3 = code.length - 1; _i3 >= 0; _i3 -= 1) {
	    letter = code[_i3];
	    Value = CHAR_SET$2.indexOf(CHAR_SET$2.filter(findValue)[0]);
	    sum += Value * (1 + (code.length - (_i3 + 1)) % 20);
	  }

	  if (Object.values(CHAR_SET$2[sum % 47])[0] !== C) return null;
	  return code.join('');
	};

	var UPC_SET = {
	  '3211': '0',
	  '2221': '1',
	  '2122': '2',
	  '1411': '3',
	  '1132': '4',
	  '1231': '5',
	  '1114': '6',
	  '1312': '7',
	  '1213': '8',
	  '3112': '9'
	};

	var ean13 = function ean13(lines) {
	  var code = ''; // manually add start dummy line

	  lines.unshift(0); // start indicator/reference lines

	  var bar = ~~((lines[1] + lines[2] + lines[3]) / 3); //eslint-disable-line

	  for (var i = 1; i < lines.length; i += 1) {
	    var group = void 0;

	    if (code.length < 6) {
	      group = lines.slice(i * 4, i * 4 + 4);
	    } else {
	      group = lines.slice(i * 4 + 5, i * 4 + 9);
	    }

	    var digits = [Math.round(group[0] / bar), Math.round(group[1] / bar), Math.round(group[2] / bar), Math.round(group[3] / bar)];
	    var result = UPC_SET[digits.join('')] || UPC_SET[digits.reverse().join('')];

	    if (result) {
	      code += result;
	    }

	    if (code.length === 12) break;
	  }

	  return code;
	};

	var UPC_SET$1 = {
	  '3211': '0',
	  '2221': '1',
	  '2122': '2',
	  '1411': '3',
	  '1132': '4',
	  '1231': '5',
	  '1114': '6',
	  '1312': '7',
	  '1213': '8',
	  '3112': '9'
	};

	var ean8 = function ean8(lines) {
	  var code = ''; // manually add start dummy line

	  lines.unshift(0); // start indicator/reference lines

	  var bar = ~~((lines[1] + lines[2] + lines[3]) / 3); //eslint-disable-line

	  for (var i = 1; i < lines.length; i += 1) {
	    var group = void 0;

	    if (code.length < 4) {
	      group = lines.slice(i * 4, i * 4 + 4);
	    } else {
	      group = lines.slice(i * 4 + 5, i * 4 + 9);
	    }

	    var digits = [Math.round(group[0] / bar), Math.round(group[1] / bar), Math.round(group[2] / bar), Math.round(group[3] / bar)];
	    var result = UPC_SET$1[digits.join('')] || UPC_SET$1[digits.reverse().join('')];

	    if (result) {
	      code += result;
	    }

	    if (code.length === 8) break;
	  }

	  return code;
	};

	var CHAR_SET$3 = {
	  nnnnnww: '0',
	  nnnnwwn: '1',
	  nnnwnnw: '2',
	  wwnnnnn: '3',
	  nnwnnwn: '4',
	  wnnnnwn: '5',
	  nwnnnnw: '6',
	  nwnnwnn: '7',
	  nwwnnnn: '8',
	  wnnwnnn: '9',
	  nnnwwnn: '-',
	  nnwwnnn: '$',
	  wnnnwnw: ':',
	  wnwnnnw: '/',
	  wnwnwnn: '.',
	  nnwwwww: '+',
	  nnwwnwn: 'A',
	  nnnwnww: 'B',
	  nwnwnnw: 'C',
	  nnnwwwn: 'D'
	};

	var codabar = function codabar(lines) {
	  var code = [];
	  var barThreshold = Math.ceil(lines.reduce(function (pre, item) {
	    return (pre + item) / 2;
	  }, 0)); // Read one encoded character at a time.

	  while (lines.length > 0) {
	    var seg = lines.splice(0, 8).splice(0, 7);
	    var a = seg.map(function (line) {
	      return line < barThreshold ? 'n' : 'w';
	    }).join('');
	    code.push(CHAR_SET$3[a]);
	  }

	  return code.join('');
	};

	var src = createCommonjsModule(function (module) {
	  /* eslint-disable */
	  var BARCODE_DECODERS = {
	    'code-128': code128,
	    'code-2of5': _2of5,
	    'code-39': code39,
	    'code-93': code93,
	    'ean-13': ean13,
	    'ean-8': ean8,
	    codabar: codabar
	    /* eslint-enable */

	    /**
	     * Scans and returns barcode from the provided image
	     *
	     * @param {*} image Image element || Canvas || ImageData || Image Path in Node.js
	     * @param {Object} options Options defining type of barcode to detect
	     * @param {String} options.barcode Barcode name
	     * @param {String=} options.type Type of Barcode
	     * @returns {String} Extracted barcode string
	     */

	  };

	  function barcodeDecoder(_x, _x2) {
	    return _barcodeDecoder.apply(this, arguments);
	  }

	  function _barcodeDecoder() {
	    _barcodeDecoder = asyncToGenerator(
	    /*#__PURE__*/
	    regenerator.mark(function _callee(image, options) {
	      var list, _ref, data, width, height, channels, spoints, numLines, slineStep, start, end, _UTILITIES$getLines, lines, padding, result;

	      return regenerator.wrap(function _callee$(_context) {
	        while (1) {
	          switch (_context.prev = _context.next) {
	            case 0:
	              // eslint-disable-next-line
	              options.barcode = options.barcode.toLowerCase();
	              list = Object.keys(BARCODE_DECODERS);

	              if (!(list.indexOf(options.barcode) === -1)) {
	                _context.next = 4;
	                break;
	              }

	              throw new Error("Invalid barcode specified. Available decoders: ".concat(list, ". https://github.com/mubaidr/Javascript-Barcode-Reader#available-decoders"));

	            case 4:
	              _context.next = 6;
	              return utiltities.getImageDataFromSource(image);

	            case 6:
	              _ref = _context.sent;
	              data = _ref.data;
	              width = _ref.width;
	              height = _ref.height;
	              channels = data.length / (width * height); // check points for barcode location

	              spoints = [1, 9, 2, 8, 3, 7, 4, 6, 5];
	              numLines = spoints.length;
	              slineStep = height / (numLines + 1); // eslint-disable-next-line

	            case 14:
	              if (!(numLines -= 1)) {
	                _context.next = 26;
	                break;
	              }

	              // create section of height 2
	              start = channels * width * Math.floor(slineStep * spoints[numLines]);
	              end = channels * width * Math.floor(slineStep * spoints[numLines]) + 2 * channels * width; // const pxLine = data.slice(start, end)
	              // const { lines, padding } = UTILITIES.getLines({

	              _UTILITIES$getLines = utiltities.getLines({
	                data: data,
	                start: start,
	                end: end,
	                width: width,
	                height: height,
	                channels: channels
	              }), lines = _UTILITIES$getLines.lines, padding = _UTILITIES$getLines.padding;

	              if (!(lines && lines.length !== 0)) {
	                _context.next = 24;
	                break;
	              }

	              // remove empty whitespaces on side of barcode
	              if (padding.left) lines.shift();
	              if (padding.right) lines.pop(); // Run the decoder

	              result = BARCODE_DECODERS[options.barcode](lines, options.type);

	              if (!result) {
	                _context.next = 24;
	                break;
	              }

	              return _context.abrupt("return", result);

	            case 24:
	              _context.next = 14;
	              break;

	            case 26:
	              throw new Error('Failed to extract barcode!');

	            case 27:
	            case "end":
	              return _context.stop();
	          }
	        }
	      }, _callee);
	    }));
	    return _barcodeDecoder.apply(this, arguments);
	  }

	  if (module && module.exports) {
	    module.exports = barcodeDecoder;
	  } else {
	    commonjsGlobal.javascriptBarcodeReader = barcodeDecoder;
	  }
	});

	return src;

}(window.jimp));
//# sourceMappingURL=javascript-barcode-reader.js.map
