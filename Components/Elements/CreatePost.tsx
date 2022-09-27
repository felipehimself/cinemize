import Button from '../UI/Button';
import CheckBox from '../UI/CheckBox';
import Form from '../UI/Form';
import FormControl from '../UI/FormControl';
import Label from '../UI/Label';
import TextArea from '../UI/TextArea';
import OptionsContainer from './OptionsContainer';

const CreatePost = ({
  options,
  genre,
}: {
  options: string[];
  genre: string[];
}): JSX.Element => {
  return (
    <div className='hidden ml-2 sm:block w-6/12 '>
      <Form className='pl-2 fixed w-4/12 pt-8 gap-4'>
        <FormControl>
          <Label htmlFor='suggestion' className='mb-2'>
            Alguma sugestão de filme ou série?
          </Label>
          <div className='flex gap-4'>
            <div className='flex items-center gap-2'>
              <input
                className='-mt-1 accent-indigo-500'
                type='radio'
                name='type'
                id='movie'
              />
              <Label htmlFor='movie'>Filme</Label>
            </div>
            <div className='flex items-center gap-2'>
              <input
                className='-mt-1 accent-indigo-500'
                type='radio'
                name='type'
                id='serie'
              />
              <Label htmlFor='serie'>Série</Label>
            </div>
          </div>
        </FormControl>
        <FormControl>
          <TextArea
            name='suggestion'
            id='suggestion'
            placeholder='Escreva aqui...'
            className='h-32'
          />
        </FormControl>

        <FormControl>
          <Label htmlFor='' className='mb-1'>
            Onde assistir?
          </Label>
          <OptionsContainer>
            {options.map((option) => {
              return (
                <Label
                  key={option}
                  className='flex gap-2 mr-2 capitalize'
                  htmlFor={option}
                >
                  <CheckBox className='' name={option} id={option} />
                  {option}
                </Label>
              );
            })}
          </OptionsContainer>
        </FormControl>

        <FormControl>
          <Label htmlFor='' className='mb-1'>
            Gênero
          </Label>
          <OptionsContainer>
            {genre.map((gen) => {
              return (
                <Label
                  key={gen}
                  className='flex gap-2 mr-2 capitalize'
                  htmlFor={gen}
                >
                  <CheckBox className={gen} name={gen} id={gen} />
                  {gen}
                </Label>
              );
            })}
          </OptionsContainer>
        </FormControl>

        <Button type='submit' className='p-2 rounded-md mt-2'>
          Post
        </Button>
      </Form>
    </div>
  );
};
export default CreatePost;
