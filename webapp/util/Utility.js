sap.ui.define([], function () {
	"use strict";

	return {

		/**
		 * Email validation
		 * 
		 * @public
		 * @param {string} sEmail an email
		 * @return true if email is correct if not false 
		 */
		isValidEmail: function (sEmail) {
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(sEmail)) {
				return true;
			}
			return false;
		},

		resizeImage: function (fnCallback) {

			Function.prototype.namedParameters = function (type, list, error) {
				var params,
					callback = type,
					regex = /^(?:function *[a-zA-Z0-9_$]*)? *\(? *([a-zA-Z0-9_$, ]*) *\)?/g,
					functions = list || {};

				if (type instanceof Array) {
					callback = type.pop();
					params = type;
				} else {
					params = ((regex.exec(callback.toString()) || [1]).slice(1)[0] || "").split(",");
				}

				params = params.map(function (item) {
					var key = item.trim();
					if (functions.hasOwnProperty(key)) {
						return functions[key];
					} else {
						return (error && error(key)) || new Error("Named parameter `" + key + "` doesn't exist.");
					}
				});

				callback.apply(this, params);
			};

			var selectImage = function (afterSelectCallback) {
				var inputFile = document.createElement("input");
				inputFile.type = "file";
				inputFile.accept = "image/*";

				inputFile.addEventListener("change", function () {
					if (afterSelectCallback) {
						afterSelectCallback(inputFile);
					}
				});

				inputFile.click();
			};

			var readImage = function (inputFile, callback) {
				var reader = new FileReader();

				reader.addEventListener("load", function () {
					var image = document.createElement("img");

					image.addEventListener("load", function () {
						if (callback) {
							callback(image, reader);
						}
					});

					image.src = reader.result;
				});

				reader.readAsDataURL(inputFile.files[0]);
			};

			var resizeWithSameRatio = function (options, callback) {
				var width = options.width || 0,
					height = options.height || 0,
					maxWidth = options.maxWidth || 800,
					maxHeight = options.maxHeight || 600;

				if (width > height) {
					if (width > maxWidth) {
						height *= maxWidth / width;
						width = maxWidth;
					}
				} else {
					if (height > maxHeight) {
						width *= maxHeight / height;
						height = maxHeight;
					}
				}

				Function.namedParameters(callback, {
					width: width,
					height: height
				});
			};

			var thumbnailWithCanvas = function (options, callback) {
				var imageSource = options.imageSource || document.createElement("img"),
					width = options.width || 0,
					height = options.height || 0,
					canvas = document.createElement("canvas"),
					imageResult = document.createElement("img"),
					context;

				canvas.width = width;
				canvas.height = height;

				context = canvas.getContext("2d");
				context.drawImage(imageSource, 0, 0, width, height);

				imageResult.addEventListener("load", function () {
					Function.namedParameters(callback, {
						imageResult: imageResult,
						canvas: canvas
					});
				});

				imageResult.src = canvas.toDataURL("image/jpg", 0.8);
			};

			var reduceImage = function (imageSource, callback) {
				resizeWithSameRatio({
					height: imageSource.height,
					maxHeight: 100,
					width: imageSource.width,
					maxWidth: 300
				}, function (height, width) {
					thumbnailWithCanvas({
						imageSource: imageSource,
						width: width,
						height: height
					}, function (canvas, imageResult) {
						callback(imageResult, canvas);
					});
				});
			};

			selectImage(function (inputFile) {
				readImage(inputFile, function (image) {
					reduceImage(image, function (imageResult) {
						fnCallback(imageResult);
					});
				});
			});
		}
	};
});