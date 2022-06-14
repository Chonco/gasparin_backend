import { UserOutputDTO } from '../../user/dtos/user-output.dto';
import { Review } from '../model/review.model';
export class ReviewOutput {
    id: number;
    title: string;
    body: string;
    score: number;
    from: UserOutputDTO;
    to: UserOutputDTO;

    static async fromEntity(review: Review): Promise<ReviewOutput> {
        const output = new ReviewOutput();

        output.id = review.id;
        output.title = review.title;
        output.body = review.body;
        output.score = review.score;
        output.from = await UserOutputDTO.fromUser(review.from);
        output.to = await UserOutputDTO.fromUser(review.to);

        return output;
    }
}