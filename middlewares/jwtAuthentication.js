import  jwt  from "jsonwebtoken";

const verifyToken = (req,res,next)=>{
    try {
        const token = req.header('Authorization')
        if(!token) return res.status(401).json({error:"Access denied"})
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.json({error:"Invalid token"})
    }
}

export default verifyToken