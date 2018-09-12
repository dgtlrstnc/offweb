
next
----------------------------------------
[ ] Logos
[ ] Points bug?
[ ] number 8 (7)
[ ] migrate to setAllE
[ ] size (pointer out?)
[ ] Screenshots (160×160 400×250)
[ ] Submit

[x] Hide cables when out, then in again on gameover
[x] Mobile message


[ ] transition intro to game

[x] high score in gameover
[x] cache radial big together
[x] intro screen
[x] transition start to intro
[x] new play btn
[x] new logger
[x] web in gameover
[x] bad and special art + fix 7-8
[x] bad connect fx
[x] tutorial state
[x] particles





all
----------------------------------------
[ ] intro screen
[ ] tutorial screen
[ ] high score in gameover
[ ] web in gameover
[ ] new play btn
[ ] new log
[ ] bad and special art
[ ] glitch when bad hit

[ ] transition out to start
[ ] transition start to intro
[ ] transition intro to tutorial
[ ] transition intro/tutorial to game
[ ] transition game to gameover
[ ] transition gameover to game

[ ] new glitch pass implementation
[ ] nicer squares animations
[ ] logos art
[ ] cache radial big together

[ ] bad points dont block to 0
[ ] bad hooks after gameover
[ ] add 2 types of special (3 total)
[ ] add points for perfect
[ ] save/use all touch positions in game logic update

[ ] retina support





performance
-----------------------------------------
[ ] don't render text/counter at 4x
[ ] cache images





done
----------------------------------------
[x] pointer entity
[x] combo points
[x] points
[x] leave after connection
[x] smarter hook batches
[x] bad connections
[x] points logger
[x] web design + gameover
[x] spiral bonus
[x] intro screen

notes
-------------------------------------------
ffmpeg -f image2 -i frames/frame_%05d.png -vcodec libx264 -crf 1 -pix_fmt yuv420p -vf scale=504:-1 out.mp4
