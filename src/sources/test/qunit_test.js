QUnit.test('prueba básica', function() {
  expect(1);
  ok(true, 'esto es algo mejor.');
});


QUnit.test('acceso al DOM', function() {
  expect(1);
  var fixture = document.getElementById('qunit-fixture');
  equal(fixture.innerText, 'esto es algo mejor.', 'debo ser capaz de acceder al DOM.');
});
