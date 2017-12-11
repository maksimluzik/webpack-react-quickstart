import React from 'react'
import 'videojs-contrib-hls'
import 'videojs-playlist'

// const fs = window.require('fs-extra')

require('./Videojs.less')
require('./Videojs-npm.less')
require('./Videojs-override.less')

class Videojs extends React.Component{
  componentDidMount() {
    //this.player = window.videojs(this.videoNode, this.props)
    //   this.player = window.videojs(this.videoNode, this.props, function onPlayerReady() {
    //     console.log('onPlayerReady', this)
    //   })
    this.player = window.videojs(this.videoNode, this.props, function() {
      this.on('error', function() {
        console.log(this.error())
        var time = this.currentTime()
        if(this.error().code === 2) {
          this.error(null).pause().load().currentTime(time).play()
        }
      })
    })

    this.player.playlist([{
      sources: [{
        src:'http://httpcache0.80608-cachelive0.dna.qbrick.com/80608-cachelive9/vt28_trotting/playlist.m3u8',
        type: 'application/x-mpegURL'
      }],
      poster: 'img/vv-poster.png'
    }, {
      sources: [{
        src:'http://httpcache0.80608-cachelive0.dna.qbrick.com/80608-cachelive9/vt28_football/playlist.m3u8',
        type: 'application/x-mpegURL'
      }],
      poster: 'img/vv-poster.png'
    }]
    )
    this.player.playlist.currentItem(selectedChannelNumber())
  }

  nextVideo() {
    this.player.playlist.next()
    fs.writeJsonSync('./sport-id', {sportId: channelNumberToSportId(this.player.playlist.currentItem())})
  }

  previousVideo() {
    this.player.playlist.previous()
    fs.writeJsonSync('./sport-id', {sportId: channelNumberToSportId(this.player.playlist.currentItem())})
  }



  render(){
    return(
      <div>
        <div className='vv-controls'>
          <button onClick={this.previousVideo.bind(this)}>Edellinen</button>
          <button onClick={this.nextVideo.bind(this)}>Seuraava</button>
        </div>
        <video ref={ node => this.videoNode = node } controls className="video-js vjs-default-skin">
        </video>
      </div>
    )
  }
}

function selectedChannelNumber() {
  const sportIdJson = fs.readJsonSync('./sport-id')
  return sportIdToChannelNumber(sportIdJson.sportId)
}

function channelNumberToSportId(channelNumber) {
  let sportId
  switch(channelNumber) {
    case 0:
      sportId = 6
      break
    case 1:
      sportId = 9
      break
    default:
      sportId = 10
  }
  return sportId
}

function sportIdToChannelNumber(sportId) {
  let channelNumber
  switch(sportId) {
    case 6:
      channelNumber = 0
      break
    case 9:
      channelNumber = 1
      break
    default:
      channelNumber = 0
  }
  return channelNumber
}

export default Videojs
