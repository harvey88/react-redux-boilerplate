import React from 'react';

class YoutubePlayer extends React.Component {
    constructor(props) {
        super(props);
    }

    constructPlayer = (video) => {
        this.player = new window.YT.Player('mountVideo', {
            height: '390',
            width: '640',
            videoId: video,
            playerVars: {
                'rel': 0,
                'showinfo': 1,
                'autoplay': 1,
                'controls': 1
            },
            events: {
                'onReady': this.onPlayerReady,
            }
        });
    }

    onPlayerReady = (event) => {
        event.target.playVideo();
    }

    componentDidMount() {
        if (!window.YT) {
            let tag = document.createElement('script');

            tag.src = 'https://www.youtube.com/iframe_api';
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            window.onYouTubeIframeAPIReady = () => {
                this.constructPlayer(this.props.video)
            }
        } else {
            this.constructPlayer(this.props.video);
        }
    }

    componentWillUnmount() {
        this.player.destroy();
    }

    render() {
        return (
            <div id='mountVideo'>
                video
            </div>
        )
    }
}

export default YoutubePlayer;