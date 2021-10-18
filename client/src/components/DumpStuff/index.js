import { useAuth } from "../../contexts/AuthContext";
import React, { useState, useEffect } from 'react';
import API from "../../util/API";
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './styles.css'
import Postcard from '../Postcard'


const useStyles = makeStyles((theme) => ({

}));

export default function OutlinedCard() {
  const classes = useStyles();
  const { currentUser } = useAuth();
  console.log(currentUser)

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState(false)
  const [filterPost, setFilterPost] = useState([])
  //the new state for filtered favs array
  const [filterFavs, setFilterFavs] = useState([])

  useEffect(() => {
    loadPosts();
  }, []);

  function loadPosts() {
    API.getPosts()
      .then(res => {
        ///console.log(res.data)
        setPosts(res.data)
        setFilterPost(res.data.filter(post => post.id === currentUser.uid))
        //changes here
        setFilterFavs(res.data.filter(post => post.id === post.uid))

      })
      .catch(err => console.log(err))
  };

  const handleFilter = async () => {
    //changes here
    setFilter(!filter) || setFilterFavs(!filter)
  }

  function deletePost(id) {
    API.deletePost(id)
      .then(res => loadPosts())
      .catch(err => console.log(err))
  }

  //changes here
  function favoritesPush(postId) {
    console.log(currentUser)
    API.favPush(postId, currentUser._id)
      .then(res => console.log(res))
      //loadPosts())
      .catch(err => console.log(err))

  }

  return (
    <div className={classes.root}>
      <Grid>

        <ButtonGroup variant="text" color="primary" aria-label="text primary button group">

          <Link to={`postform/${currentUser && currentUser.uid}`}><Button>Make a Post</Button></Link>

          <Button onClick={handleFilter}>My Posts</Button>
          {/* onclick that calls a function to filter a new favorites state */}
          <Button onClick={handleFilter}>My Favorites</Button>
        </ButtonGroup>

      </Grid>
      {/* changes here with !favorites */}
      {!filter && !filterFavs ?
        posts.map(post => {
          return (
            <Postcard
              key={post.id}
              post={post}
            >
              {/* <Link> */}
              {/* //when passing in an arguement we need to make the function a callback , passing the id of the post*/}
              <FavoriteIcon onClick={() => favoritesPush(post._id)} >Favorite</FavoriteIcon>
              {/* </Link> */}
            </Postcard>
          )
        })
        : filterPost.map(post => {
          return (<>
            <Postcard
              key={post.id}
              post={post}>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteForeverIcon />}
                  onClick={() => deletePost(post._id)}
                >
                  Delete
                </Button>
                <Link to={{
                  pathname: `/update/${post._id}`,
                  //we are passing a state object to page we are taken to, the post we want to update
                  state: post
                }}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<UpdateIcon />}

                  >
                    Update
                  </Button>
                </Link>
              </CardActions>
            </Postcard>

          </>) || filterFavs.map(post => {
            return (<>
              <Postcard
                post={post}>
              </Postcard>
            </>)
          })
        })}
    </div >)
}