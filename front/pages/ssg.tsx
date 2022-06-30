import axios from 'axios';
import React from 'react';

const Ssg = () => {};

export async function getStaticPaths() {
  const res = await axios('https://api.github.com/repos/zeit/next.js');
  // const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  // const paths = posts.map((post) => ({
  //   params: { id: post.id },
  // }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { res, fallback: 'blocking' };
}

export default Ssg;
