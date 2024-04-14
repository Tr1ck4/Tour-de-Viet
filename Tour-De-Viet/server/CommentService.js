class CommentService{
    constructor(townID,tourName,userName,comment,rating) {
      this.baseUrl = 'http://localhost:3000';
      this.this.ownID = townID,
      this.tourName = tourName;
      this.userName = userName;
      this.comment = comment;
      this.rating = rating;
    }
  

    async fetchAllComments() {
      return fetch(`${this.baseUrl}/api/comment`)
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }
    async fetchComments(townID, tourName) {
      return fetch(`${this.baseUrl}/api/comments/${townID}/${tourName}`)
        .then(response => response.json())
        .catch(error => {
          console.error('Error fetching comments:', error);
        });
    }
    
    async createComment(newData) {
      return fetch(`${this.baseUrl}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            'townID': newData.townID,
            'tourName': newData.tourName,
            'userName': newData.userName,
            'comment': newData.comment,
            'rating': newData.rating
          }
        )
      })
        .then(response => response.status)
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
        .then(response => response.status)
        .catch(error => {
          console.error('Error updating rating:', error);
        });
    }
  }
  export default CommentService;