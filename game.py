import json
import threading
import time
import random

class Game():
    def __init__(self):
        self.x=0
        self.y=0
        self.xlimit = 50
        self.ylimit = 50
        self.speed = 0.08
        self.worms = []
        self.treats = []
        self.players = 0
        self.clear_blocks = []
        self.active_players = set()
        self.update_thread = threading.Thread(target=self.update_loop)
        self.update_thread.start()
        self.treat()

    def get_current_frame(self):
        return self.current_frame

    def update_loop(self):
        while True:
            self.current_frame = self.get_next_frame()
            time.sleep(self.speed)

    def new_player(self):
        self.worms.append(Worm(self, self.players))
        self.players += 1
        self.active_players.add(self.players-1)
        return self.players - 1

    def remove_player(self, player):
        if player in self.active_players:
            self.active_players.remove(player)
            self.clear_blocks += self.worms[player].blocks

    @property
    def full_blocks(self):
        blocks = []
        for player in self.active_players:
            blocks += self.worms[player].blocks
        return blocks

    def command(self, command, player):
        self.worms[player].command(command.lower())

    def get_next_frame(self):
        worms = []
        scores = []
        player_no = 1
        dead_players = []
        clear = self.clear_blocks
        self.clear_blocks = []
        for i in self.active_players:
            tail, head, newhead = self.worms[i].move()
            if self.worms[i].dead:
                dead_players.append(i)
                continue
            worms.append({'tail': tail, 'oldhead': head, 'newhead': newhead})
            scores.append(f"Player {player_no}: {self.worms[i].score}")
            player_no += 1
        for player in dead_players:
            self.remove_player(player)
        return json.dumps({'worms': worms, 'scores': scores, 'treats': self.treats, 'clear': clear})

    def treat(self):
        self.treats.append((random.randint(0,self.xlimit-1), random.randint(0,self.ylimit-1)))

class Worm():
    def __init__(self, game, player):
        self.blocks = [(0,0), (0,1), (0,2)]
        self.direction = (0,1)
        self.game = game
        self.score = 0
        self.player = player
        self.dead = False

    def command(self, command):
        keymap = {'arrowleft': (-1,0),
                  'arrowright': (1,0),
                  'arrowup': (0,-1),
                  'arrowdown': (0,1),
                  'a': (-1,0),
                  'd': (1,0),
                  'w': (0,-1),
                  's': (0,1),
        }
        try:
            newdirection = keymap[command]
        except KeyError:
            return
        if newdirection[0] == self.direction[0] or newdirection[1] == self.direction[1]:
            return
        self.direction = newdirection

    def move(self):
        head = self.blocks[-1]
        x, y = self.direction
        newhead = ( (head[0]+x) % self.game.xlimit, (head[1]+y) % self.game.ylimit )
        if newhead in self.game.full_blocks:
            self.dead = True
            return None, None, None
        else:
            if newhead in self.game.treats:
                self.score += 1
                self.game.treats.remove(newhead)
                self.game.treat()
                tail = (-100,-100)
            else:
                tail = self.blocks.pop(0)
            self.blocks.append(newhead)
        return tail, head, newhead
