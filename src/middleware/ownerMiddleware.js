// const isOwner = (req, res, next) => {
//   if (req.user && req.user.role === "OWNER") {
//     next();
//   } else {
//     res.status(403).json({ message: "Owner access only" });
//   }
// };

// export default isOwner;

// const isOwner = (req, res, next) => {
//   if (!req.user) {
//     return res.status(401).json({ message: "Not authorized" });
//   }

//   if (req.user.role !== "OWNER") {
//     return res.status(403).json({ message: "Owner access only" });
//   }

//   next();
// };

// export default isOwner;
export default function isOwner(req, res, next) {
  if (!req.user || req.user.role !== "OWNER") {
    return res.status(403).json({ message: "Owner access only" });
  }
  next();
}

