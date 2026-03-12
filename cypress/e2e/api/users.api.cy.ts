describe('Users API - JSONPlaceholder', () => {
  const apiUrl = Cypress.env('apiUrl');

  it('GET /users - should retrieve all users', () => {
    cy.apiRequest('GET', '/users').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.length(10);

      const firstUser = response.body[0];
      expect(firstUser).to.have.property('id', 1);
      expect(firstUser).to.have.property('name');
      expect(firstUser).to.have.property('email');
      expect(firstUser).to.have.property('username');
    });
  });

  it('POST /users - should create a new user', () => {
    const newUser = {
      name: 'QA Automation Engineer',
      username: 'qa_engineer',
      email: 'qa@testing.com',
      phone: '555-1234',
      website: 'qa-testing.dev',
    };

    cy.apiRequest('POST', '/users', newUser).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');
      expect(response.body.name).to.eq(newUser.name);
      expect(response.body.username).to.eq(newUser.username);
      expect(response.body.email).to.eq(newUser.email);
    });
  });

  it('PUT /users/1 - should update an existing user', () => {
    const updatedUser = {
      id: 1,
      name: 'Updated QA Engineer',
      username: 'updated_qa',
      email: 'updated_qa@testing.com',
    };

    cy.apiRequest('PUT', '/users/1', updatedUser).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.name).to.eq(updatedUser.name);
      expect(response.body.username).to.eq(updatedUser.username);
      expect(response.body.email).to.eq(updatedUser.email);
    });
  });

  it('DELETE /users/1 - should delete a user', () => {
    cy.apiRequest('DELETE', '/users/1').then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
