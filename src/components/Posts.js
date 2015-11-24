import './Posts.css';
import React, { Component, PropTypes } from 'react';
import Header from './Header';
import Post from './Post';

function jazz(g, d = 0.000012) {
  return g + Math.random() * (d * 2) - d;
}

export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array,
    karma: PropTypes.number,
    loading: PropTypes.loading,
    fetchPosts: PropTypes.func,
    upvote: PropTypes.func,
    downvote: PropTypes.func,
    kill: PropTypes.func,
    star: PropTypes.func,
    location: PropTypes.object
  }

  geoDataSource = new mapboxgl.GeoJSONSource({
    data: {}
  })

  componentDidMount() {
    this.props.fetchPosts(this.props.location.pathname);

    mapboxgl.accessToken = 'pk.eyJ1IjoiaGFuc2UiLCJhIjoiY2loYjlxMnIwMDA2Y3Y0a2x5aDdqZmliZSJ9.8qn0wbpcwkByqP4cZIZyYw';

    const container = document.createElement('div');
    container.setAttribute('id', 'map');
    document.body.appendChild(container);

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v8',
      center: [10.41, 63.43],
      zoom: 13
    });

    map.on('style.load', () => {
      map.addSource('markers', this.geoDataSource);

      map.addLayer({
        id: 'markers',
        type: 'symbol',
        interactive: true,
        source: 'markers',
        layout: {
          'icon-image': 'rocket-15',
          'text-field': '{title} {description}',
          'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 0.6],
          'text-anchor': 'top'
        },
        paint: {
          'text-size': 12
        }
      });

      map.on('click', (e) => {
        // map.setFilter('markers', ['all', ['in', 'id'].concat([1,2,3])]);
        map.featuresAt(e.point, { radius: 10 }, (err, features) => {
          if (features && features.length > 0) {
            // document.getElementById('feature').innerHTML = features[0].properties.description;
          }
        });
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.props.fetchPosts(nextProps.location.pathname);
    }

    if (this.props.posts !== nextProps.posts) {
      this.geoDataSource.setData({
        type: 'FeatureCollection',
        features: nextProps.posts.map(post => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              jazz(parseFloat(post.location.loc_coordinates.lng)),
              jazz(parseFloat(post.location.loc_coordinates.lat))
            ]
          },
          properties: {
            id: post.post_id,
            title: post.vote_count,
            description: post.message,
            'marker-color': '#63b6e5',
            'marker-symbol': 'rocket',
            'marker-size': 'large'
          }
        }))
      });
    }
  }

  render() {
    const { posts, loading, upvote, downvote, kill, star } = this.props;
    return (
      <div>
        <Header />
        <div className='Posts u-content'>
          {loading && <div className='loading-overlay'>Loading...</div>}
          {posts.map(post => <Post
            key={post.id}
            {...{ post, upvote, downvote, kill, star }}
          />)}
        </div>
      </div>
    );
  }
}
