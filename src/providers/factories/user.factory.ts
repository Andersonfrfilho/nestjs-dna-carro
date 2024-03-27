import { faker } from '@faker-js/faker/locale/pt_BR';
import { User } from '../../modules/user/entities/user.entity';
import { ParamsFactoryGeneric } from './interface.factory';
import { DOCUMENT_USER_TYPES } from '../../modules/user/user.constant';
import { GENDERS } from '../../commons/enum.common';

interface ParamsDto extends Partial<User>, ParamsFactoryGeneric {}

export class UsersFactory {
  public generate({
    passwordHash = '1234',
    quantity = 1,
    ...rest
  }: ParamsDto): Partial<User>[] {
    const documents: string[] = [];
    const emails: string[] = [];
    let document = '';
    let email = '';

    const arrayUsers = Array.from({ length: quantity }, (): Partial<User> => {
      const documentType = faker.helpers.arrayElement(
        Object.values(DOCUMENT_USER_TYPES),
      );
      document =
        documentType === DOCUMENT_USER_TYPES.CPF
          ? faker.string.numeric('###########')
          : faker.string.numeric('##############');

      while (documents.includes(document)) {
        document =
          documentType === DOCUMENT_USER_TYPES.CPF
            ? faker.string.numeric('###########')
            : faker.string.numeric('##############');
      }

      documents.push(document);

      while (emails.includes(email)) {
        email = faker.internet.email().toLowerCase();
      }

      emails.push(email);

      const dataFaker: User = {
        id: faker.string.uuid(),
        name: faker.person.firstName().toLowerCase(),
        lastName: faker.person.lastName().toLowerCase(),
        email,
        birthDate: faker.date.past().getTime(),
        gender: faker.helpers.arrayElement(Object.values(GENDERS)),
        document,
        documentType,
        passwordHash,
        password_hash: passwordHash,
        active: faker.datatype.boolean(),
        details: faker.lorem.paragraph(5),
      } as any;

      return {
        ...dataFaker,
        ...rest,
      };
    });
    return arrayUsers;
  }
}
