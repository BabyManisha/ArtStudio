Vue.use(VueMaterial.default);
new Vue({
	el: '#app',
	data: {
		currentFilter: 'ALL',
		projects: [
			{title: "Artwork", image: "https://picsum.photos/g/200?image=122", category: 'ART'},
			{title: "Charcoal", image: "https://picsum.photos/g/200?image=116", category: 'ART'},
			{title: "Sketching", image: "https://picsum.photos/g/200?image=121", category: 'DOODLES'},
			{title: "Acrillic", image: "https://picsum.photos/g/200?image=133", category: 'WORKSHOPS'},
			{title: "Pencil", image: "https://picsum.photos/g/200?image=134", category: 'DOODLES'},
			{title: "Pen", image: "https://picsum.photos/g/200?image=115", category: 'ART'},
			{title: "Inking", image: "https://picsum.photos/g/200", category: 'WORKSHOPS'},
    ],
    images: [],
    visible: false,
    index: 0,
    // imgs: [
    //   'https://via.placeholder.com/450.png/',
    //   'https://via.placeholder.com/300.png/',
    //   'https://via.placeholder.com/150.png/'
    // ]
  },
  created() {
    const self = this;
    fetch('https://www.instagram.com/lekha_art_vision/?__a=1')
    .then(res => res.json())
    .then(res => {
      console.log(res);
      res = res.graphql.user.edge_owner_to_timeline_media.edges;
      console.log(res);
      self.images = res.map(node => {
        return {
          title: node.node.edge_media_to_caption.edges[0].node.text,
          src: node.node.display_url,
          likes: node.node.edge_liked_by.count,
          dateTime: new Date(node.node.taken_at_timestamp*1000).toLocaleDateString()
        }
      });
    });
  },
	methods: {
		setFilter: function(filter) {
			this.currentFilter = filter;
    },
    showImg (index) {
      this.index = index;
      this.visible = true;
    },
    handleHide () {
      this.visible = false
    }
  },
})