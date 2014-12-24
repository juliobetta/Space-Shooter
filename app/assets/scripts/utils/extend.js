Namespace("Shooter.extend", function (obj) {
  Array.prototype.slice.call(arguments, 1).forEach(function (el) {
    if (el) {
      obj.super = {};

      for (var prop in el) {
        obj[prop] = el[prop];
        if(el[prop] instanceof Function) obj.super[prop] = el[prop].bind(obj);
      }
    }
  });

  return obj;
});