import { Request, Response } from "express"

export const getTestMessage = async (req: Request, res: Response) => {
    try {
  
      const responseJson: any = {
        message: "Health Check Successfully"
      }
      res.status(200).json(responseJson)
    } catch (error) {
      console.error(error)
      const responseJson: any = {
        message: `Health Check Successfully: ${
          (error as Error).message
        }}`,
      }
      res.status(403).json(responseJson)
    }
  }