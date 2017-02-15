$(function(){ 
  var store = new Store('example', { remote: 'http://localhost:4984/example', PouchDB: PouchDB });
  
	$('#contactForm').submit(function(event) {
    event.preventDefault();

    var name = $('#name').val();
    var email = $('#email').val();
    var mobile = $('#mobile').val();

    // Save the contact to the database
    store.add({
      name: name,
      mobile: mobile,
      email: email
    });

    $('#contactForm')[0].reset();
  });

  //add new contact to the page
  function addNewContactToList(contact) {
    var newContact = '<tr><td>' + contact.name + '</td><td>' + contact.mobile + '</td><td>' + contact.email + '</td></tr>'
    $("#contactList tbody").append(newContact);
  }

  //when a new entry is added to the database, run the corresponding function
  store.on('add', addNewContactToList);

  function loadContacts() {
    store.findAll().then(function(contacts) {
      var tbody = '';
      $.each(contacts, function (i, contact) {
        var row = '<tr><td>' + contact.name + '</td><td>' + contact.mobile + '</td><td>' + contact.email + '</td></tr>';
        tbody += row;
      });

      $("#contactList tbody").html('').html(tbody);
    });
  }

  // when the site loads in the browser,
  // we load all previously saved contacts from hoodie
  loadContacts();

  store.connect();
});