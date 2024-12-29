import { useState, useEffect } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";

export const AppHandler = () => {
  const [reviews, setReviews] = useState([]);
  const [newMovieName, setNewMovieName] = useState("");
  const [newReviewComments, setNewReviewComments] = useState("");
  const [editId, setEditId] = useState(null);
  const [editComments, setEditComments] = useState("");
  const [movieNameTouched, setMovieNameTouched] = useState(false);
  const [reviewCommentsTouched, setReviewCommentsTouched] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedMovie, setExpandedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getGroupedReviews = () => {
    return reviews.reduce((acc, review) => {
      if (!acc[review.movieName]) {
        acc[review.movieName] = [];
      }
      acc[review.movieName].push(review);
      return acc;
    }, {});
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    if (editId === null) {
      setEditComments("");
    }
  }, [editId]);

  const resetForm = () => {
    setNewMovieName("");
    setNewReviewComments("");
    setShowAddForm(false);
    setMovieNameTouched(false);
    setReviewCommentsTouched(false);
  };

  const resetEditState = () => {
    setEditId(null);
    setEditComments("");
    fetchReviews();
  };

  const handleError = (error, action) => {
    console.error(`Error ${action}:`, error);
    setError(`Failed to ${action}. Please try again.`);
    toast.error(`Failed to ${action}. Please try again.`);
    setTimeout(() => setError(null), 5000);
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/MovieReviewApp");
      setReviews(response.data);
    } catch (error) {
      handleError(error, "fetch reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async () => {
    if (!newMovieName.trim() || !newReviewComments.trim()) {
      setError("Please fill in both movie name and review comments.");
      setMovieNameTouched(true);
      setReviewCommentsTouched(true);
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Adding review...");

    try {
      const response = await axios.post("/MovieReviewApp", {
        movieName: newMovieName.trim(),
        reviewComments: newReviewComments.trim(),
      });
      setReviews([...reviews, response.data]);
      resetForm();
      setExpandedMovie(newMovieName.trim());
      toast.success("Review added successfully!", { id: toastId });
    } catch (error) {
      handleError(error, "add review");
      toast.error("Failed to add review", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id) => {
    setLoading(true);
    const toastId = toast.loading("Deleting review...");

    try {
      await axios.delete(`/MovieReviewApp/${id}`);
      const updatedReviews = reviews.filter((review) => review.id !== id);
      setReviews(updatedReviews);

      const movieName = reviews.find((review) => review.id === id)?.movieName;
      if (
        movieName &&
        !updatedReviews.some((review) => review.movieName === movieName)
      ) {
        setExpandedMovie(null);
      }

      if (editId === id) {
        resetEditState();
      }
      toast.success("Review deleted successfully!", { id: toastId });
    } catch (error) {
      handleError(error, "delete review");
      toast.error("Failed to delete review", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleEditReview = (id, currentComments) => {
    setEditId(id);
    setEditComments(currentComments);
  };

  const handleSaveEdit = async (id) => {
    try {
      setLoading(true);
      const toastId = toast.loading("Updating review...");
      if (editComments.trim() === "") {
        return;
      }
      const response = await axios.put(
        `/MovieReviewApp/${id}`,
        editComments.trim()
      );

      if (response.status === 200) {
        setReviewData((prevData) => ({
          ...prevData,
          reviewComments: editComments.trim(),
        }));
      }
      toast.success("Review updated successfully!", { id: toastId });
      setLoading(false);
      resetEditState();
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleCancelEdit = () => {
    resetEditState();
  };

  const handleMovieExpand = (movieName) => {
    setExpandedMovie(expandedMovie === movieName ? null : movieName);
  };

  const handleToggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (showAddForm) {
      resetForm();
    }
  };

  const isFormValid = () => {
    return newMovieName.trim() !== "" && newReviewComments.trim() !== "";
  };

  return {
    reviews,
    newMovieName,
    newReviewComments,
    editId,
    editComments,
    showAddForm,
    expandedMovie,
    loading,
    error,
    movieNameTouched,
    reviewCommentsTouched,
    setNewMovieName,
    setNewReviewComments,
    setEditComments,
    setMovieNameTouched,
    setReviewCommentsTouched,
    groupedReviews: getGroupedReviews(),
    isFormValid: isFormValid(),
    handleAddReview,
    handleDeleteReview,
    handleEditReview,
    handleSaveEdit,
    handleCancelEdit,
    handleMovieExpand,
    handleToggleAddForm,
    resetForm,
  };
};

export default AppHandler;
