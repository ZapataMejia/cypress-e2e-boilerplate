describe('Posts API - JSONPlaceholder', () => {
  it('GET /posts - should retrieve all posts and validate structure', () => {
    cy.apiRequest('GET', '/posts').then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);

      const firstPost = response.body[0];
      expect(firstPost).to.have.all.keys('userId', 'id', 'title', 'body');
      expect(firstPost.id).to.eq(1);
      expect(firstPost.userId).to.be.a('number');
      expect(firstPost.title).to.be.a('string');
    });
  });

  it('POST /posts - should create a new post and return it with an id', () => {
    cy.fixture('api-responses').then((data) => {
      const newPost = data.createPost;

      cy.apiRequest('POST', '/posts', newPost).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('id');
        expect(response.body.title).to.eq(newPost.title);
        expect(response.body.body).to.eq(newPost.body);
        expect(response.body.userId).to.eq(newPost.userId);
      });
    });
  });

  it('PUT /posts/1 - should update an existing post completely', () => {
    cy.fixture('api-responses').then((data) => {
      const updatedPost = data.updatePost;

      cy.apiRequest('PUT', '/posts/1', updatedPost).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(updatedPost.id);
        expect(response.body.title).to.eq(updatedPost.title);
        expect(response.body.body).to.eq(updatedPost.body);
        expect(response.body.userId).to.eq(updatedPost.userId);
      });
    });
  });
});
