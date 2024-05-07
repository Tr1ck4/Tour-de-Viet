class CommentService {
  constructor(townID, tourName, userName, comment, rating) {
    this.baseUrl = 'http://localhost:3000';
    this.townID = townID;
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
    console.log("aaaaaaaaaaaaaaaaaaaaaa");
    return fetch(`${this.baseUrl}/api/comments/${townID}/${tourName}`)
      .then(response => response.json())
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }

  async createComment(newData) {
    try {
      const response = await fetch(`${this.baseUrl}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'townID': newData.townID,
          'tourName': newData.tourName,
          'userName': newData.userName,
          'comment': newData.comment,
          'rating': newData.rating
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create comment');
      }

      return response.status;
    } catch (error) {
      console.error('Error creating comment:', error);
      if (error.message === 'Token not found') {
        window.location.href('/login');
      }
      throw error;
    }
  }

  async updateCommentRating(townID, tourName, rating) {
    try {
      const response = await fetch(`${this.baseUrl}/api/comments/${townID}/${tourName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating })
      });

      if (!response.ok) {
        throw new Error('Failed to update rating');
      }

      return response.status;
    } catch (error) {
      console.error('Error updating rating:', error);
      if (error.message === 'Token not found') {
        window.location.href('/login');
      }
      throw error;
    }
  }

}
export default CommentService;