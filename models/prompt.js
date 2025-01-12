import { model, models , Schema} from 'mongoose';

const promptSchema = new Schema({
    creator:{
        type : Schema.Types.ObjectId,
        ref: 'User'//one to many relationshp a user can creat emany prompts
    },
    prompt:{
        type: String,
        required:[true, 'Prompt is required']
    },
    tag:{
        type: String,
        required: [true, 'Tag is required']
    }

})

const Prompt= models.Prompt || model('Prompt',promptSchema)

export default Prompt;