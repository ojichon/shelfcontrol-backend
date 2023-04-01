const express = require('express')
const app = express

const { Sequalize } = require('sequalize')
const sequalize = new Sequalize("postgres://shelfcontrol_user:a75s3hb6Jh7CuBZ3x6BFYcjH06QhgIte@dpg-cghodp2k728s1bpn159g-a/shelfcontrol")