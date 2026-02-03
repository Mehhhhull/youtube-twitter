import mongoose , {Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; //see this

const videoSchema=new Schema(
  {
    videoFile:{
      type:String,//cloudinary url
      required:True
    },
    thumbnail:{
      type:String,//cloudinary url
      required:True
    },
    title:{
      type:String,
      required:True
    },
    description:{
      type:String,
      required:True
    },
    duration:{
      type:Number,//from cloudinary
      required:True
    },
    views:{
      type:Number,
      default:0
    },
    isPublished:{
      type:Boolean,
      default:false
    },
    owner:{
      type:Schema.types.ObjectId,
      ref:"User",
    }
  },

  {
    timestamps:true
  }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video=mongoose.model("Video",videoSchema)