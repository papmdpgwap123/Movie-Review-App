import React from "react";
import { Toaster } from "react-hot-toast";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from "@mui/material";
import { AppHandler } from "./handlers/AppHandler";
import MovieReviewList from "./components/MovieReviewList";

const App = () => {
  const {
    reviews,
    newMovieName,
    newReviewComments,
    editId,
    editComments,
    expandedMovie,
    loading,
    error,
    groupedReviews,
    isFormValid,
    setNewMovieName,
    setNewReviewComments,
    setEditComments,
    handleAddReview,
    handleDeleteReview,
    handleEditReview,
    handleSaveEdit,
    handleMovieExpand,
    movieNameTouched,
    reviewCommentsTouched,
    setMovieNameTouched,
    setReviewCommentsTouched,
  } = AppHandler();

  if (loading && !reviews.length) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, width: "100%" }}>
      <Toaster position="top-right" />

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Box flex={4}>
          <Card
            sx={{
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.45)",
              },
            }}
          >
            <CardContent sx={{ padding: "2rem" }}>
              <Typography
                variant="h4"
                sx={{
                  marginBottom: "1.5rem",
                  fontWeight: 600,
                  color: "#1a237e",
                  textAlign: "center",
                }}
              >
                Add New Movie Review
              </Typography>
              <Paper
                sx={{
                  padding: "2rem",
                  marginBottom: "1.5rem",
                  background: "rgba(255, 255, 255, 0.9)",
                  borderRadius: "12px",
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <TextField
                      label="Movie Name"
                      value={newMovieName}
                      onChange={(e) => {
                        setNewMovieName(e.target.value);
                        setMovieNameTouched(true);
                      }}
                      fullWidth
                      required
                      error={movieNameTouched && newMovieName.trim() === ""}
                      helperText={
                        movieNameTouched && newMovieName.trim() === ""
                          ? "Movie name is required"
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#1a237e",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#1a237e",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Review Comments"
                      value={newReviewComments}
                      onChange={(e) => {
                        setNewReviewComments(e.target.value);
                        setReviewCommentsTouched(true);
                      }}
                      fullWidth
                      multiline
                      rows={3}
                      required
                      error={
                        reviewCommentsTouched && newReviewComments.trim() === ""
                      }
                      helperText={
                        reviewCommentsTouched && newReviewComments.trim() === ""
                          ? "Review comments are required"
                          : ""
                      }
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&:hover fieldset": {
                            borderColor: "#1a237e",
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#1a237e",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={handleAddReview}
                      disabled={!isFormValid || loading}
                      sx={{
                        backgroundColor: "#1a237e",
                        padding: "0.75rem 2rem",
                        fontSize: "1.1rem",
                        "&:hover": {
                          backgroundColor: "#000051",
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "rgba(26, 35, 126, 0.5)",
                        },
                      }}
                    >
                      {loading ? (
                        <CircularProgress
                          size={24}
                          sx={{ marginRight: "0.5rem", color: "white" }}
                        />
                      ) : null}
                      Submit Review
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </CardContent>
          </Card>
        </Box>

        <MovieReviewList
          groupedReviews={groupedReviews}
          expandedMovie={expandedMovie}
          handleMovieExpand={handleMovieExpand}
          editId={editId}
          editComments={editComments}
          setEditComments={setEditComments}
          handleSaveEdit={handleSaveEdit}
          handleEditReview={handleEditReview}
          handleDeleteReview={handleDeleteReview}
          loading={loading}
        />
      </Box>
    </Box>
  );
};

export default App;
