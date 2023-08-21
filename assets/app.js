const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const listsSong = $('.list-song');
const heading = $('.header h2');
const cdSong = $('.img');
const audioSong = $('#audio') ;
const playBtn = $('.play');
const pauseBtn = $('.pause');
const progressSong = $('.progress');
const nextBtn = $('.next');
const preBtn = $('.pre');
const randomSong = $('.random');
const replay = $('.replay');
const listItem = $('.list-item')
const app = {
    currentIndex : 0,
    songs:[
        {
            name:'2AM',
            singer: 'JustaTee - BigDaddy',
            path: './assets/music/audio2.mp3',
            image: './assets/img/image2.jpg'
        },
        {
            name:'Summer love',
            singer: 'DEAMN',
            path: './assets/music/audio4.mp3',
            image: './assets/img/image4.jpg'
        },
        
        {
            name:'Nothing stopping me',
            singer: 'Kat Nestel',
            path: './assets/music/audio3.mp3',
            image: './assets/img/image3.jpg'
        },
        {
            name:'Monody',
            singer: 'TheFatRat',
            path: './assets/music/audio1.mp3',
            image: './assets/img/image1.jpg'
        },
        {
            name:'The river',
            singer: 'Axel Johansson',
            path: './assets/music/audio5.mp3',
            image: './assets/img/image5.jpg'
        },
        {
            name:'Nắng Ấm Xa Dần',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/audio6.mp3',
            image: './assets/img/image6.jpeg'
        },
        {
            name:'Chạy Ngay Đi',
            singer: 'Sơn Tùng MTP',
            path: './assets/music/audio7.mp3',
            image: './assets/img/image7.jpg'
        },
        {
            name:'Ngôi Sao Cô Đơn',
            singer: 'Jack',
            path: './assets/music/audio8.mp3',
            image: './assets/img/image8.jpg'
        },
        {
            name:'heroes tonight',
            singer: 'Janji',
            path: './assets/music/audio9.mp3',
            image: './assets/img/image9.jpg'
        },
        {
            name:'On & On',
            singer: 'Cartoon',
            path: './assets/music/audio10.mp3',
            image: './assets/img/image10.jpg'
        },
        
    ],

    //todo: render bài hát 
    renderSong: function(){
        const htmls = this.songs.map(function(song, index){
            return `
                <div class="list-item ${index === app.currentIndex ? 'active' : ''}"
                data-index = "${index}">
                    <div class="avatar">
                        <img class="avatar-img" src="${song.image}" alt="">
                    </div>
                    <div class="info">
                        <h4 class= "name">${song.name}</h4>
                        <p class="singer">${song.singer}</p>
                    </div>
                    <div class="add">...</div>
                </div>              
            `
        });
        listsSong.innerHTML = htmls.join('');
    },
    handleEvent: function(){


        // todo: xử lí thu phóng image

        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        document.onscroll = function(){
            const scrollTop = window.scrollY;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        //todo: xử lý cd quay / dừng

        const cdAnimate = cdSong.animate([
            {transform: 'rotate(360deg)'}
        ],{
            duration : 10000,
            iterations: Infinity
        });
        cdAnimate.pause();

        //todo: xu ly nut replay
        replay.onclick = function(){
            audio.currentTime = 0; 
        }

        //todo: prev song
        preBtn.onclick = function(){
            app.preSong();
            audio.play();
            cdAnimate.play();
            app.renderSong();
            app.scrollActiveSong();
            pauseBtn.style.display = 'block';
            playBtn.style.display = 'none';
        }


        //todo: xử lý nút play
        playBtn.onclick = function(){
            audio.play();
            pauseBtn.style.display = 'block';
            playBtn.style.display = 'none';
            cdAnimate.play();
        }

        //todo: xử lý nút pause
        pauseBtn.onclick = function(){
            audio.pause();
            playBtn.style.display = 'block';
            pauseBtn.style.display = 'none';
            cdAnimate.pause();
        }

        //todo: next song
        nextBtn.onclick = function(){
            app.nextSong();
            audio.play();
            cdAnimate.play();
            app.renderSong();
            app.scrollActiveSong();
            pauseBtn.style.display = 'block';
            playBtn.style.display = 'none';
        }

        //todo: 
        randomSong.onclick = function(){
            app.random()
            audio.play();
            cdAnimate.play();
            app.renderSong();
            app.scrollActiveSong();
            pauseBtn.style.display = 'block';
            playBtn.style.display = 'none';

        }

        // todo: progress song
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = audio.currentTime / audio.duration *100;
                 progressSong.value = progressPercent;
            }
        }

        //todo: change progress song
        progressSong.onchange = function(e){
           const changeTime = audio.duration / 100 * progressSong.value;
           audio.currentTime = changeTime;
        }

        //todo: khi het bai hat
        audio.onended = function(){
            nextBtn.click();
        }

        listsSong.onclick = function(e){
            const SongNode = e.target.closest('.list-item:not(.active)');
            const addElement = e.target.closest('.add');
            if(SongNode || addElement){
             
            }
            if(SongNode){
                app.currentIndex = Number( SongNode.getAttribute('data-index'));
                app.loadCurrentSong();
                app.renderSong();
                cdAnimate.play();
                audio.play();
                pauseBtn.style.display = 'block';
                playBtn.style.display = 'none';
            }
        }

    },
    //todo: next song
    nextSong: function(){
        this.currentIndex++;
        if(this.currentIndex >= this.songs.length){
            this.currentIndex = 0;
        }
        this.loadCurrentSong();  
    },
    //todo: prev song
    preSong: function(){
        this.currentIndex--;
        if(this.currentIndex < 0){
            this.currentIndex =  this.songs.length;
        }
        this.loadCurrentSong();  
    },
    //todo: Random Song 
    random: function(){
        do{
            var newIndex = Math.floor(Math.random() * this.songs.length);
        }
        while(newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        
    },

    scrollActiveSong: function(){
        setTimeout(function(){
            $('.list-item.active').scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            })
        },300);
    },

    //todo: lấy bài hát đầu tiên làm mặc định
    getCurrentSong: function(){
        return this.songs[this.currentIndex];
    },

    //todo: load bài hát lên html
    loadCurrentSong: function(){
        heading.textContent = this.getCurrentSong().name;
        cdSong.src = this.getCurrentSong().image;
        audioSong.src = this.getCurrentSong().path;
    },

    //todo: hàm bắt đầu chạy 
    start: function(){
        this.handleEvent();
        this.renderSong();
        this.getCurrentSong()
        this.loadCurrentSong();  
        
    }
}


app.start();
