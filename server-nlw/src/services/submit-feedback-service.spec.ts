import { SubmitFeedbackService } from "./submit-feedback-service";

// Funções espiãs: serve para saber se as funções mocadas no teste, ao menos foram chamadas
const createFeedBackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
  { create: createFeedBackSpy },
  { sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
  it('Should to be able to submit a feedback', async () => {
    await expect(submitFeedbackService.execute({
      comment: 'example comment',
      type: 'BUG',
      screenshot: 'data:image/png;base64asdasdasdas'
    })).resolves.not.toThrow();

    expect(createFeedBackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it('Should not be able to submit a feedback without a type', async () => {
    await expect(submitFeedbackService.execute({
      comment: 'example comment',
      type: '',
      screenshot: 'data:image/png;base64asdasdasdas'
    })).rejects.toThrow('Type is required!');
  });

  it('Should not be able to submit a feedback without a comment', async () => {
    await expect(submitFeedbackService.execute({
      comment: '',
      type: 'BUG',
      screenshot: 'data:image/png;base64asdasdasdas'
    })).rejects.toThrow('Comment is required!');
  });

  it('Should not be able to submit a feedback with an invalid screenshot format', async () => {
    await expect(submitFeedbackService.execute({
      comment: 'example comment',
      type: 'BUG',
      screenshot: 'teste.png'
    })).rejects.toThrow('Invalid screenshot format!');
  });
})