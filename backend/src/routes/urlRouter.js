import express, { Router } from 'express'
import { createUrl, deleteUrlByUrlCode, getUrlByUrlCode, getUrlsForUser, updateUrl } from '../services/urlServices.js'
import Url from '../models/UrlModel.js'
import { verifyAccessToken } from '../middlewares/authToken.js'
import generator from 'generate-password'

const router = Router()

router.post("/", verifyAccessToken, async (req, res) => {
  //TODO you can move this to a seperate controller
  //TODO add validation here
  const { originalLink } = req.body;
  const token = req.headers['authorization']

  if (originalLink) {
    try {
      let userData = await Url.find({ userId: req["user"].id })
      let check = await userData.some(el => el.originalLink == originalLink)
      if(!check){
      const data = await createUrl({ ...req.body, userId: req["user"].id });
      res.status(201).json(data);
      }
      else res.status(400).json('url already exists')

    } catch (error) {
      res.status(500).json("Internal server error");
    }
  } else {
    res.status(400).json("Missing required paramaters");
  }
});

router.get("/:urlCode", async (req, res) => {
  const urlCode = req.params.urlCode
  if (!urlCode) res.status(404).send("Bad request")

  try {
    const data = await getUrlByUrlCode(urlCode)
    res.status(301).redirect(data.originalLink)
  } catch (error) {
    res.status(500).json("Internal server error");
  }
})

router.get("/user/:userId", verifyAccessToken, async (req, res) => {
  const userId = req.params.userId
  if (userId !== req['user'].id) {
    res.status(401).json('access denied')
    return
  }
  try {
    const data = await getUrlsForUser(userId)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json("Internal server error");
  }
})

router.delete('/:urlCode', verifyAccessToken, async (req, res) => {
  const urlCode = req.params.urlCode;
  if (!urlCode) res.status(400).send('Bad request')
  try {
    const data = await deleteUrlByUrlCode(urlCode)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json('internal server error')
  }
})

router.put('/:urlCode', verifyAccessToken, async (req, res) => {
  const urlCode = req.params.urlCode;
  if (!urlCode) {
    res.status(400).send('Bad request')
  }
  try {
    const data = await updateUrl(req.body)
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json('internal server error')
  }
})

export default router