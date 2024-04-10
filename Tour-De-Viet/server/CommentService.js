class CommentService{
    constructor() {
      this.baseUrl = 'http://localhost:3000';
    }
  
    async fetchComments(townID, tourName) {
      return fetch(`${this.baseUrl}/api/comments/${townID}/${tourName}`)
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }
    
    async createComment(townID,tourName,userName,comment,rating) {
      const requestData = {
        townID,
        tourName,
        userName,
        comment,
        rating
      };
    
      return fetch(`${this.baseUrl}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })
        .then(response => response.json())
        .catch(error => {
          console.error('Error creating comment:', error);
        });
    }
    
    async updateCommentRating(townID, tourName, rating) {
      return fetch(`${this.baseUrl}/api/comments/${townID}/${tourName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating })
      })
        .then(response => response.json())
        .catch(error => {
          console.error('Error updating rating:', error);
        });
    }
  }
  export default CommentService;