// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing data (optional)
  await prisma.answerOption.deleteMany();
  await prisma.referenceAnswer.deleteMany();
  await prisma.question.deleteMany();

  // =============================
  // Lesson: Phương trình bậc nhất
  // =============================

  await prisma.question.create({
    data: {
      id: "q0001000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Nghiệm của phương trình 2x + 3 = 0 là:" },
      explanation: "Giải phương trình: 2x + 3 = 0 => x = -3/2",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0001000-0000-4000-a000-000000000001",
      difficulty: "REMEMBERING",
      options: {
        create: [
          { id: "a0001001-0000-4000-a000-000000000001", content: { text: "-3/2" }, isCorrect: true, order: 1 },
          { id: "a0001001-0000-4000-a000-000000000002", content: { text: "3/2" }, isCorrect: false, order: 2 },
          { id: "a0001001-0000-4000-a000-000000000003", content: { text: "-2/3" }, isCorrect: false, order: 3 },
          { id: "a0001001-0000-4000-a000-000000000004", content: { text: "2/3" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0001001-0000-4000-a000-000000000001",
          content: { text: "-3/2" }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0001000-0000-4000-a000-000000000002",
      type: "TRUE_FALSE",
      content: { text: "Chọn Đúng/Sai cho các mệnh đề sau về phương trình bậc nhất" },
      explanation: "Phương trình bậc nhất có dạng ax + b = 0 và luôn có nghiệm nếu a ≠ 0",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0001000-0000-4000-a000-000000000001",
      difficulty: "UNDERSTANDING",
      options: {
        create: [
          { id: "a0001002-0000-4000-a000-000000000001", content: { text: "Phương trình 2x + 3 = 0 có nghiệm x = -3/2" }, isCorrect: true, order: 1 },
          { id: "a0001002-0000-4000-a000-000000000002", content: { text: "Phương trình bậc nhất luôn có vô số nghiệm" }, isCorrect: false, order: 2 },
          { id: "a0001002-0000-4000-a000-000000000003", content: { text: "Phương trình x + 1 = 1 có nghiệm x = 0" }, isCorrect: true, order: 3 },
          { id: "a0001002-0000-4000-a000-000000000004", content: { text: "Phương trình 0x + 1 = 0 có nghiệm x = -1" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0001002-0000-4000-a000-000000000001",
          content: { statements: [true, false, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0001000-0000-4000-a000-000000000003",
      type: "ESSAY",
      content: { text: "Giải và biện luận phương trình: ax + b = 0" },
      explanation: "Tuỳ theo giá trị của a, b: Nếu a ≠ 0 => có 1 nghiệm; a = 0, b ≠ 0 => vô nghiệm; a = b = 0 => vô số nghiệm",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0001000-0000-4000-a000-000000000001",
      difficulty: "ANALYZING",
      referenceAnswers: {
        create: {
          id: "ra0001003-0000-4000-a000-000000000001",
          content: { text: "Phân tích theo a, b như giải thích." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0001000-0000-4000-a000-000000000004",
      type: "MULTIPLE_CHOICE",
      content: { text: "Chọn các phương trình là phương trình bậc nhất:" },
      explanation: "Phương trình bậc nhất là phương trình có dạng ax + b = 0, bậc cao nhất là 1",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0001000-0000-4000-a000-000000000001",
      difficulty: "UNDERSTANDING",
      options: {
        create: [
          { id: "a0001004-0000-4000-a000-000000000001", content: { text: "x + 2 = 0" }, isCorrect: true, order: 1 },
          { id: "a0001004-0000-4000-a000-000000000002", content: { text: "x^2 + 1 = 0" }, isCorrect: false, order: 2 },
          { id: "a0001004-0000-4000-a000-000000000003", content: { text: "2x - 5 = 0" }, isCorrect: true, order: 3 },
          { id: "a0001004-0000-4000-a000-000000000004", content: { text: "3x^2 + 2x + 1 = 0" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0001004-0000-4000-a000-000000000001",
          content: { answers: [true, false, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0001000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "Phương trình nào sau đây vô nghiệm?" },
      explanation: "0x + 5 = 0 là vô nghiệm vì không tồn tại x nào thỏa mãn",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0001000-0000-4000-a000-000000000001",
      difficulty: "APPLYING",
      options: {
        create: [
          { id: "a0001005-0000-4000-a000-000000000001", content: { text: "0x + 5 = 0" }, isCorrect: true, order: 1 },
          { id: "a0001005-0000-4000-a000-000000000002", content: { text: "2x + 1 = 0" }, isCorrect: false, order: 2 },
          { id: "a0001005-0000-4000-a000-000000000003", content: { text: "x = 1" }, isCorrect: false, order: 3 },
          { id: "a0001005-0000-4000-a000-000000000004", content: { text: "-x + 3 = 0" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0001005-0000-4000-a000-000000000001",
          content: { text: "0x + 5 = 0" }
        }
      }
    }
  });

  // =============================
  // Lesson: Phương trình bậc hai
  // =============================

  await prisma.question.create({
    data: {
      id: "q0002000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Công thức nghiệm của phương trình bậc hai ax² + bx + c = 0 (a ≠ 0) là:" },
      explanation: "Công thức nghiệm của phương trình bậc hai ax² + bx + c = 0 (a ≠ 0) là x = (-b ± √(b² - 4ac)) / 2a",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0002000-0000-4000-a000-000000000002",
      difficulty: "REMEMBERING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0002001-0000-4000-a000-000000000001", content: { text: "x = (-b ± √(b² - 4ac)) / 2a" }, isCorrect: true, order: 1 },
          { id: "a0002001-0000-4000-a000-000000000002", content: { text: "x = (-b ± √(b² + 4ac)) / 2a" }, isCorrect: false, order: 2 },
          { id: "a0002001-0000-4000-a000-000000000003", content: { text: "x = (b ± √(b² - 4ac)) / 2a" }, isCorrect: false, order: 3 },
          { id: "a0002001-0000-4000-a000-000000000004", content: { text: "x = (-b ± √(b² - 4ac)) / 2c" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0002001-0000-4000-a000-000000000001",
          content: { text: "x = (-b ± √(b² - 4ac)) / 2a" }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0002000-0000-4000-a000-000000000002",
      type: "MULTIPLE_CHOICE",
      content: { text: "Chọn các phát biểu đúng về phương trình bậc hai:" },
      explanation: "Phương trình bậc hai có dạng ax² + bx + c = 0 (a ≠ 0). Nó có thể có 2, 1 hoặc 0 nghiệm thực tùy thuộc vào delta = b² - 4ac.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0002000-0000-4000-a000-000000000002",
      difficulty: "UNDERSTANDING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0002002-0000-4000-a000-000000000001", content: { text: "Phương trình bậc hai luôn có hai nghiệm phân biệt" }, isCorrect: false, order: 1 },
          { id: "a0002002-0000-4000-a000-000000000002", content: { text: "Phương trình bậc hai có thể có một nghiệm kép" }, isCorrect: true, order: 2 },
          { id: "a0002002-0000-4000-a000-000000000003", content: { text: "Nếu delta < 0, phương trình bậc hai vô nghiệm thực" }, isCorrect: true, order: 3 },
          { id: "a0002002-0000-4000-a000-000000000004", content: { text: "Nếu a > 0, đồ thị hàm số y = ax² + bx + c là parabol mở lên" }, isCorrect: true, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0002002-0000-4000-a000-000000000001",
          content: { answers: [false, true, true, true] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0002000-0000-4000-a000-000000000003",
      type: "TRUE_FALSE",
      content: { text: "Xác định tính đúng sai của các mệnh đề sau về phương trình bậc hai:" },
      explanation: "Phương trình bậc hai có dạng ax² + bx + c = 0 (a ≠ 0). Delta = b² - 4ac quyết định số nghiệm của phương trình.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0002000-0000-4000-a000-000000000002",
      difficulty: "APPLYING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0002003-0000-4000-a000-000000000001", content: { text: "Phương trình x² - 2x + 1 = 0 có nghiệm kép x = 1" }, isCorrect: true, order: 1 },
          { id: "a0002003-0000-4000-a000-000000000002", content: { text: "Phương trình x² + 1 = 0 có hai nghiệm phức" }, isCorrect: true, order: 2 },
          { id: "a0002003-0000-4000-a000-000000000003", content: { text: "Phương trình x² - 4 = 0 có hai nghiệm x = 2 và x = -2" }, isCorrect: true, order: 3 },
          { id: "a0002003-0000-4000-a000-000000000004", content: { text: "Tổng hai nghiệm của phương trình ax² + bx + c = 0 là -b/a" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0002003-0000-4000-a000-000000000001",
          content: { statements: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0002000-0000-4000-a000-000000000004",
      type: "ESSAY",
      content: { text: "Giải và biện luận phương trình bậc hai: 2x² - 3x - 5 = 0" },
      explanation: "Giải phương trình 2x² - 3x - 5 = 0: a = 2, b = -3, c = -5. Delta = b² - 4ac = (-3)² - 4(2)(-5) = 9 + 40 = 49 > 0. Vậy phương trình có hai nghiệm phân biệt: x₁ = (3 + 7)/4 = 2.5 và x₂ = (3 - 7)/4 = -1.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0002000-0000-4000-a000-000000000002",
      difficulty: "ANALYZING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      referenceAnswers: {
        create: {
          id: "ra0002004-0000-4000-a000-000000000001",
          content: { text: "Phương trình 2x² - 3x - 5 = 0 có a = 2, b = -3, c = -5. Tính delta = b² - 4ac = (-3)² - 4(2)(-5) = 9 + 40 = 49 > 0. Vậy phương trình có hai nghiệm phân biệt: x₁ = (3 + 7)/4 = 2.5 và x₂ = (3 - 7)/4 = -1." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0002000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "Phương trình x² - 6x + 9 = 0 có:" },
      explanation: "Phương trình x² - 6x + 9 = 0 có a = 1, b = -6, c = 9. Delta = b² - 4ac = (-6)² - 4(1)(9) = 36 - 36 = 0. Vậy phương trình có nghiệm kép x = 3.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0002000-0000-4000-a000-000000000002",
      difficulty: "EVALUATING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0002005-0000-4000-a000-000000000001", content: { text: "Hai nghiệm phân biệt" }, isCorrect: false, order: 1 },
          { id: "a0002005-0000-4000-a000-000000000002", content: { text: "Một nghiệm kép x = 3" }, isCorrect: true, order: 2 },
          { id: "a0002005-0000-4000-a000-000000000003", content: { text: "Vô nghiệm" }, isCorrect: false, order: 3 },
          { id: "a0002005-0000-4000-a000-000000000004", content: { text: "Vô số nghiệm" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0002005-0000-4000-a000-000000000001",
          content: { text: "Một nghiệm kép x = 3" }
        }
      }
    }
  });

  // =============================
  // Lesson: Bất phương trình
  // =============================

  await prisma.question.create({
    data: {
      id: "q0003000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Tập nghiệm của bất phương trình x - 3 > 0 là:" },
      explanation: "Giải bất phương trình x - 3 > 0 → x > 3. Vậy tập nghiệm là (3, +∞).",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0003000-0000-4000-a000-000000000003",
      difficulty: "REMEMBERING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0003001-0000-4000-a000-000000000001", content: { text: "x > 3" }, isCorrect: true, order: 1 },
          { id: "a0003001-0000-4000-a000-000000000002", content: { text: "x < 3" }, isCorrect: false, order: 2 },
          { id: "a0003001-0000-4000-a000-000000000003", content: { text: "x ≥ 3" }, isCorrect: false, order: 3 },
          { id: "a0003001-0000-4000-a000-000000000004", content: { text: "x ≤ 3" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0003001-0000-4000-a000-000000000001",
          content: { text: "x > 3" }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0003000-0000-4000-a000-000000000002",
      type: "MULTIPLE_CHOICE",
      content: { text: "Chọn các bất phương trình có tập nghiệm là (-∞, 2]:" },
      explanation: "Tập nghiệm (-∞, 2] tương ứng với các bất phương trình có dạng x ≤ 2.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0003000-0000-4000-a000-000000000003",
      difficulty: "UNDERSTANDING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0003002-0000-4000-a000-000000000001", content: { text: "x - 2 ≤ 0" }, isCorrect: true, order: 1 },
          { id: "a0003002-0000-4000-a000-000000000002", content: { text: "2 - x ≥ 0" }, isCorrect: true, order: 2 },
          { id: "a0003002-0000-4000-a000-000000000003", content: { text: "x + 2 < 4" }, isCorrect: true, order: 3 },
          { id: "a0003002-0000-4000-a000-000000000004", content: { text: "x > -2" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0003002-0000-4000-a000-000000000001",
          content: { answers: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0003000-0000-4000-a000-000000000003",
      type: "TRUE_FALSE",
      content: { text: "Xác định tính đúng sai của các mệnh đề sau về bất phương trình:" },
      explanation: "Các quy tắc cơ bản khi giải bất phương trình: nhân/chia cả hai vế với số âm sẽ đổi dấu bất đẳng thức.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0003000-0000-4000-a000-000000000003",
      difficulty: "APPLYING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0003003-0000-4000-a000-000000000001", content: { text: "Khi nhân hai vế của bất phương trình với một số âm, ta phải đổi dấu bất đẳng thức" }, isCorrect: true, order: 1 },
          { id: "a0003003-0000-4000-a000-000000000002", content: { text: "Bất phương trình x² > 0 có nghiệm là tất cả các số thực khác 0" }, isCorrect: true, order: 2 },
          { id: "a0003003-0000-4000-a000-000000000003", content: { text: "Bất phương trình (x - 1)(x - 2) > 0 có nghiệm là x < 1 hoặc x > 2" }, isCorrect: false, order: 3 },
          { id: "a0003003-0000-4000-a000-000000000004", content: { text: "Tập nghiệm của bất phương trình x² < 0 là tập rỗng" }, isCorrect: true, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0003003-0000-4000-a000-000000000001",
          content: { statements: [true, true, false, true] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0003000-0000-4000-a000-000000000004",
      type: "ESSAY",
      content: { text: "Giải và biểu diễn tập nghiệm của bất phương trình: (x - 1)(x - 3) < 0" },
      explanation: "Để giải bất phương trình dạng tích, ta xét dấu của từng nhân tử. Tích âm khi một nhân tử âm, nhân tử còn lại dương.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0003000-0000-4000-a000-000000000003",
      difficulty: "ANALYZING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      referenceAnswers: {
        create: {
          id: "ra0003004-0000-4000-a000-000000000001",
          content: { text: "Xét bất phương trình (x - 1)(x - 3) < 0. Để tích hai nhân tử âm, ta cần một nhân tử âm và một nhân tử dương. Xét các trường hợp:\n- x - 1 < 0 và x - 3 > 0: Không thỏa mãn vì nếu x < 1 thì x < 3, nên x - 3 < 0.\n- x - 1 > 0 và x - 3 < 0: Thỏa mãn khi 1 < x < 3.\nVậy tập nghiệm của bất phương trình là (1, 3)." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0003000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "Tập nghiệm của bất phương trình x² - 5x + 6 > 0 là:" },
      explanation: "Giải bất phương trình x² - 5x + 6 > 0. Phân tích vế trái: x² - 5x + 6 = (x - 2)(x - 3). Để tích dương, cả hai nhân tử cùng dấu. Vậy x < 2 hoặc x > 3.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2001000-0000-4000-a000-000000000001",
      lessonId: "l0003000-0000-4000-a000-000000000003",
      difficulty: "EVALUATING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0003005-0000-4000-a000-000000000001", content: { text: "x < 2 hoặc x > 3" }, isCorrect: true, order: 1 },
          { id: "a0003005-0000-4000-a000-000000000002", content: { text: "2 < x < 3" }, isCorrect: false, order: 2 },
          { id: "a0003005-0000-4000-a000-000000000003", content: { text: "x < 3" }, isCorrect: false, order: 3 },
          { id: "a0003005-0000-4000-a000-000000000004", content: { text: "x > 2" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0003005-0000-4000-a000-000000000001",
          content: { text: "x < 2 hoặc x > 3" }
        }
      }
    }
  });

  // =============================
  // Lesson: Tam giác
  // =============================

  await prisma.question.create({
    data: {
      id: "q0004000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Tổng số đo các góc trong tam giác bằng:" },
      explanation: "Tổng số đo các góc trong tam giác luôn bằng 180 độ (hay π radian).",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0004000-0000-4000-a000-000000000004",
      difficulty: "REMEMBERING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0004001-0000-4000-a000-000000000001", content: { text: "180°" }, isCorrect: true, order: 1 },
          { id: "a0004001-0000-4000-a000-000000000002", content: { text: "90°" }, isCorrect: false, order: 2 },
          { id: "a0004001-0000-4000-a000-000000000003", content: { text: "360°" }, isCorrect: false, order: 3 },
          { id: "a0004001-0000-4000-a000-000000000004", content: { text: "270°" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0004001-0000-4000-a000-000000000001",
          content: { text: "180°" }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0004000-0000-4000-a000-000000000002",
      type: "MULTIPLE_CHOICE",
      content: { text: "Chọn các phát biểu đúng về tam giác:" },
      explanation: "Tam giác có nhiều tính chất quan trọng: tổng góc bằng 180°, độ dài mỗi cạnh nhỏ hơn tổng hai cạnh còn lại, và các tính chất đặc biệt của tam giác đều, cân, vuông.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0004000-0000-4000-a000-000000000004",
      difficulty: "UNDERSTANDING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0004002-0000-4000-a000-000000000001", content: { text: "Trong tam giác, độ dài mỗi cạnh luôn nhỏ hơn tổng độ dài hai cạnh còn lại" }, isCorrect: true, order: 1 },
          { id: "a0004002-0000-4000-a000-000000000002", content: { text: "Tam giác đều có ba cạnh bằng nhau và ba góc bằng nhau" }, isCorrect: true, order: 2 },
          { id: "a0004002-0000-4000-a000-000000000003", content: { text: "Tam giác vuông có một góc 90°" }, isCorrect: true, order: 3 },
          { id: "a0004002-0000-4000-a000-000000000004", content: { text: "Mọi tam giác đều đều là tam giác vuông" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0004002-0000-4000-a000-000000000001",
          content: { answers: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0004000-0000-4000-a000-000000000003",
      type: "TRUE_FALSE",
      content: { text: "Xác định tính đúng sai của các mệnh đề sau về tam giác:" },
      explanation: "Các tính chất cơ bản của tam giác bao gồm: tổng góc, bất đẳng thức tam giác, và các tính chất của các loại tam giác đặc biệt.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0004000-0000-4000-a000-000000000004",
      difficulty: "APPLYING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0004003-0000-4000-a000-000000000001", content: { text: "Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông" }, isCorrect: true, order: 1 },
          { id: "a0004003-0000-4000-a000-000000000002", content: { text: "Tam giác cân có hai cạnh bằng nhau và hai góc đối diện với hai cạnh đó bằng nhau" }, isCorrect: true, order: 2 },
          { id: "a0004003-0000-4000-a000-000000000003", content: { text: "Tam giác đều có các góc đều bằng 60°" }, isCorrect: true, order: 3 },
          { id: "a0004003-0000-4000-a000-000000000004", content: { text: "Trong mọi tam giác, cạnh dài nhất luôn đối diện với góc nhỏ nhất" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0004003-0000-4000-a000-000000000001",
          content: { statements: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0004000-0000-4000-a000-000000000004",
      type: "ESSAY",
      content: { text: "Trình bày định lý Pytago và cách chứng minh. Sau đó giải bài toán: Cho tam giác vuông có hai cạnh góc vuông là 3cm và 4cm. Tính cạnh huyền." },
      explanation: "Định lý Pytago nói rằng trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông. Áp dụng công thức c = √(a² + b²).",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0004000-0000-4000-a000-000000000004",
      difficulty: "ANALYZING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      referenceAnswers: {
        create: {
          id: "ra0004004-0000-4000-a000-000000000001",
          content: { text: "Định lý Pytago: Trong tam giác vuông, bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông. Nếu gọi cạnh huyền là c, hai cạnh góc vuông là a và b, ta có: c² = a² + b².\n\nGiải bài toán: Cho tam giác vuông có hai cạnh góc vuông là 3cm và 4cm.\nGọi cạnh huyền là c.\nÁp dụng định lý Pytago: c² = 3² + 4² = 9 + 16 = 25\nSuy ra c = √25 = 5cm.\nVậy cạnh huyền của tam giác vuông là 5cm." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0004000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "Diện tích của tam giác có độ dài các cạnh là 3cm, 4cm và 5cm là:" },
      explanation: "Sử dụng công thức Heron để tính diện tích tam giác khi biết độ dài ba cạnh: S = √[p(p-a)(p-b)(p-c)] với p = (a+b+c)/2.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0004000-0000-4000-a000-000000000004",
      difficulty: "EVALUATING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0004005-0000-4000-a000-000000000001", content: { text: "6 cm²" }, isCorrect: true, order: 1 },
          { id: "a0004005-0000-4000-a000-000000000002", content: { text: "7,5 cm²" }, isCorrect: false, order: 2 },
          { id: "a0004005-0000-4000-a000-000000000003", content: { text: "10 cm²" }, isCorrect: false, order: 3 },
          { id: "a0004005-0000-4000-a000-000000000004", content: { text: "12 cm²" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0004005-0000-4000-a000-000000000001",
          content: { text: "6 cm²" }
        }
      }
    }
  });

  // =============================
  // Lesson: Tứ giác
  // =============================

  await prisma.question.create({
    data: {
      id: "q0005000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Tổng số đo các góc trong tứ giác là:" },
      explanation: "Tổng số đo các góc trong tứ giác là 360° (hay 2π radian). Công thức tổng quát cho đa giác n cạnh là (n-2) × 180°.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0005000-0000-4000-a000-000000000005",
      difficulty: "REMEMBERING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0005001-0000-4000-a000-000000000001", content: { text: "360°" }, isCorrect: true, order: 1 },
          { id: "a0005001-0000-4000-a000-000000000002", content: { text: "180°" }, isCorrect: false, order: 2 },
          { id: "a0005001-0000-4000-a000-000000000003", content: { text: "270°" }, isCorrect: false, order: 3 },
          { id: "a0005001-0000-4000-a000-000000000004", content: { text: "540°" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0005001-0000-4000-a000-000000000001",
          content: { text: "360°" }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0005000-0000-4000-a000-000000000002",
      type: "MULTIPLE_CHOICE",
      content: { text: "Chọn các phát biểu đúng về tứ giác:" },
      explanation: "Tứ giác có nhiều loại đặc biệt với các tính chất riêng: hình chữ nhật, hình vuông, hình thoi, hình bình hành.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0005000-0000-4000-a000-000000000005",
      difficulty: "UNDERSTANDING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0005002-0000-4000-a000-000000000001", content: { text: "Hình chữ nhật là tứ giác có bốn góc vuông" }, isCorrect: true, order: 1 },
          { id: "a0005002-0000-4000-a000-000000000002", content: { text: "Hình thoi là tứ giác có bốn cạnh bằng nhau" }, isCorrect: true, order: 2 },
          { id: "a0005002-0000-4000-a000-000000000003", content: { text: "Hình bình hành là tứ giác có các cạnh đối song song và bằng nhau" }, isCorrect: true, order: 3 },
          { id: "a0005002-0000-4000-a000-000000000004", content: { text: "Mọi hình thoi đều là hình vuông" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0005002-0000-4000-a000-000000000001",
          content: { answers: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0005000-0000-4000-a000-000000000003",
      type: "TRUE_FALSE",
      content: { text: "Xác định tính đúng sai của các mệnh đề sau về tứ giác:" },
      explanation: "Các tính chất cơ bản của tứ giác và các loại tứ giác đặc biệt: hình chữ nhật, hình vuông, hình thoi, hình bình hành, hình thang.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0005000-0000-4000-a000-000000000005",
      difficulty: "APPLYING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0005003-0000-4000-a000-000000000001", content: { text: "Hình vuông là hình chữ nhật có bốn cạnh bằng nhau" }, isCorrect: true, order: 1 },
          { id: "a0005003-0000-4000-a000-000000000002", content: { text: "Hình thoi là hình bình hành có bốn cạnh bằng nhau" }, isCorrect: true, order: 2 },
          { id: "a0005003-0000-4000-a000-000000000003", content: { text: "Hình thang có ít nhất một cặp cạnh đối diện song song" }, isCorrect: true, order: 3 },
          { id: "a0005003-0000-4000-a000-000000000004", content: { text: "Hình chữ nhật luôn có các đường chéo bằng nhau" }, isCorrect: true, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0005003-0000-4000-a000-000000000001",
          content: { statements: [true, true, true, true] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0005000-0000-4000-a000-000000000004",
      type: "ESSAY",
      content: { text: "Trình bày các tính chất của hình bình hành và chứng minh rằng đường chéo của hình bình hành cắt nhau tại trung điểm của mỗi đường chéo." },
      explanation: "Hình bình hành là tứ giác có các cạnh đối song song và bằng nhau. Các đường chéo của hình bình hành cắt nhau tại trung điểm.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0005000-0000-4000-a000-000000000005",
      difficulty: "ANALYZING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      referenceAnswers: {
        create: {
          id: "ra0005004-0000-4000-a000-000000000001",
          content: { text: "Tính chất của hình bình hành:\n1. Các cạnh đối diện song song và bằng nhau\n2. Các góc đối diện bằng nhau\n3. Các đường chéo cắt nhau tại trung điểm của mỗi đường\n\nChứng minh đường chéo cắt nhau tại trung điểm:\nGọi ABCD là hình bình hành, AC và BD là hai đường chéo, O là giao điểm của AC và BD.\nTrong hình bình hành, các cạnh đối diện song song và bằng nhau: AB // CD và AB = CD; AD // BC và AD = BC.\nXét tam giác AOB và COD:\n- AB // CD (vì ABCD là hình bình hành)\n- AO và CO là các đoạn thẳng nằm trên cùng một đường thẳng AC\n- BO và DO là các đoạn thẳng nằm trên cùng một đường thẳng BD\nTheo định lý Thà-lê, ta có: AO/OC = BO/OD\nTương tự, xét tam giác AOD và BOC, ta có: AO/OC = DO/OB\nTừ hai đẳng thức trên, suy ra: BO/OD = DO/OB, hay BO × OB = DO × OD\nDiều này chỉ xảy ra khi BO = OD và AO = OC\nVậy O là trung điểm của cả AC và BD." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0005000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "Diện tích hình bình hành có đáy 8cm và chiều cao tương ứng 5cm là:" },
      explanation: "Diện tích hình bình hành được tính bằng tích của đáy và chiều cao tương ứng: S = a × h.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0005000-0000-4000-a000-000000000005",
      difficulty: "EVALUATING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0005005-0000-4000-a000-000000000001", content: { text: "40 cm²" }, isCorrect: true, order: 1 },
          { id: "a0005005-0000-4000-a000-000000000002", content: { text: "20 cm²" }, isCorrect: false, order: 2 },
          { id: "a0005005-0000-4000-a000-000000000003", content: { text: "13 cm²" }, isCorrect: false, order: 3 },
          { id: "a0005005-0000-4000-a000-000000000004", content: { text: "26 cm²" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0005005-0000-4000-a000-000000000001",
          content: { text: "40 cm²" }
        }
      }
    }
  });

  // =============================
  // Lesson: Đường tròn
  // =============================

  await prisma.question.create({
    data: {
      id: "q0006000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Công thức tính chu vi đường tròn có bán kính R là:" },
      explanation: "Chu vi đường tròn có bán kính R được tính theo công thức: C = 2πR.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0006000-0000-4000-a000-000000000006",
      difficulty: "REMEMBERING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0006001-0000-4000-a000-000000000001", content: { text: "C = 2πR" }, isCorrect: true, order: 1 },
          { id: "a0006001-0000-4000-a000-000000000002", content: { text: "C = πR" }, isCorrect: false, order: 2 },
          { id: "a0006001-0000-4000-a000-000000000003", content: { text: "C = πR²" }, isCorrect: false, order: 3 },
          { id: "a0006001-0000-4000-a000-000000000004", content: { text: "C = 4πR" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0006001-0000-4000-a000-000000000001",
          content: { text: "C = 2πR" }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0006000-0000-4000-a000-000000000002",
      type: "MULTIPLE_CHOICE",
      content: { text: "Chọn các phát biểu đúng về đường tròn:" },
      explanation: "Đường tròn là tập hợp các điểm cách đều một điểm cố định (tâm) một khoảng cách bằng bán kính. Các tính chất cơ bản bao gồm chu vi, diện tích, và các quan hệ với tiếp tuyến, dây, góc...",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0006000-0000-4000-a000-000000000006",
      difficulty: "UNDERSTANDING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0006002-0000-4000-a000-000000000001", content: { text: "Diện tích hình tròn có bán kính R là πR²" }, isCorrect: true, order: 1 },
          { id: "a0006002-0000-4000-a000-000000000002", content: { text: "Tiếp tuyến của đường tròn tại một điểm luôn vuông góc với bán kính đi qua điểm đó" }, isCorrect: true, order: 2 },
          { id: "a0006002-0000-4000-a000-000000000003", content: { text: "Góc nội tiếp nằm trên cung lớn bằng nửa góc ở tâm cùng chận trên cung đó" }, isCorrect: true, order: 3 },
          { id: "a0006002-0000-4000-a000-000000000004", content: { text: "Mọi đường thẳng cắt đường tròn đều là tiếp tuyến" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0006002-0000-4000-a000-000000000001",
          content: { answers: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0006000-0000-4000-a000-000000000003",
      type: "TRUE_FALSE",
      content: { text: "Xác định tính đúng sai của các mệnh đề sau về đường tròn:" },
      explanation: "Các tính chất cơ bản của đường tròn bao gồm: chu vi, diện tích, tiếp tuyến, dây, góc nội tiếp, góc tâm...",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0006000-0000-4000-a000-000000000006",
      difficulty: "APPLYING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0006003-0000-4000-a000-000000000001", content: { text: "Góc tâm là góc có đỉnh tại tâm đường tròn" }, isCorrect: true, order: 1 },
          { id: "a0006003-0000-4000-a000-000000000002", content: { text: "Dây của đường tròn là đoạn thẳng nối hai điểm bất kỳ trên đường tròn" }, isCorrect: true, order: 2 },
          { id: "a0006003-0000-4000-a000-000000000003", content: { text: "Tiếp tuyến với đường tròn tại một điểm có duy nhất một điểm chung với đường tròn" }, isCorrect: true, order: 3 },
          { id: "a0006003-0000-4000-a000-000000000004", content: { text: "Góc nội tiếp luôn lớn hơn góc tâm cùng chận trên một cung" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0006003-0000-4000-a000-000000000001",
          content: { statements: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0006000-0000-4000-a000-000000000004",
      type: "ESSAY",
      content: { text: "Trình bày và chứng minh định lý về góc nội tiếp. Sau đó giải bài toán: Cho đường tròn tâm O, AB là một dây của đường tròn. C điểm trên đường tròn sao cho góc ACB = 30°. Tính số đo góc AOB." },
      explanation: "Định lý về góc nội tiếp: Góc nội tiếp nằm trên cung nhỏ bằng nửa góc tâm cùng chận trên cung đó. Góc nội tiếp nằm trên cung lớn bằng nửa góc tâm cùng chận trên cung đó.",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0006000-0000-4000-a000-000000000006",
      difficulty: "ANALYZING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      referenceAnswers: {
        create: {
          id: "ra0006004-0000-4000-a000-000000000001",
          content: { text: "Định lý về góc nội tiếp: Góc nội tiếp là góc có đỉnh nằm trên đường tròn và hai cạnh là hai dây của đường tròn. Góc nội tiếp nằm trên cung nhỏ bằng nửa góc tâm cùng chẫn trên cung đó.\n\nChứng minh: Gọi O là tâm đường tròn, A và B là hai điểm trên đường tròn, C là điểm trên đường tròn (nằm trên cung nhỏ AB). Góc ACB là góc nội tiếp, góc AOB là góc tâm cùng chẫn trên cung AB.\nXét tam giác AOC:\n- OA = OC (vì là bán kính đường tròn)\n- Suy ra tam giác AOC là tam giác cân tại O\n- Góc OAC = góc OCA\nTương tự, trong tam giác BOC, ta có góc OBC = góc OCB\nGóc ACB = góc OCA + góc OCB = góc OAC + góc OBC\nTrong tam giác AOB, góc AOB + góc OAB + góc OBA = 180°\nSuy ra góc OAB + góc OBA = 180° - góc AOB\nMặt khác, góc OAC + góc OBC = góc OAB + góc OBA = 180° - góc AOB\nVậy góc ACB = 180° - góc AOB\nHoặc góc AOB = 2 × góc ACB (khi C nằm trên cung lớn AB)\n\nGiải bài toán: Cho đường tròn tâm O, AB là một dây của đường tròn. C điểm trên đường tròn sao cho góc ACB = 30°.\nTheo định lý về góc nội tiếp, góc AOB = 2 × góc ACB = 2 × 30° = 60°.\nVậy góc AOB = 60°." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0006000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "Diện tích hình tròn có bán kính 5cm là:" },
      explanation: "Diện tích hình tròn có bán kính R được tính theo công thức: S = πR². Với R = 5cm, ta có S = π × 5² = 25π cm².",
      courseId: "c1001000-0000-4000-a000-000000000001",
      chapterId: "c2002000-0000-4000-a000-000000000002",
      lessonId: "l0006000-0000-4000-a000-000000000006",
      difficulty: "EVALUATING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0006005-0000-4000-a000-000000000001", content: { text: "25π cm²" }, isCorrect: true, order: 1 },
          { id: "a0006005-0000-4000-a000-000000000002", content: { text: "10π cm²" }, isCorrect: false, order: 2 },
          { id: "a0006005-0000-4000-a000-000000000003", content: { text: "5π cm²" }, isCorrect: false, order: 3 },
          { id: "a0006005-0000-4000-a000-000000000004", content: { text: "20π cm²" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0006005-0000-4000-a000-000000000001",
          content: { text: "25π cm²" }
        }
      }
    }
  });

  // =============================
  // Course: Vật lý 10
  // Chapter: Động học chất điểm
  // Lesson: Chuyển động thẳng đều
  // =============================

  await prisma.question.create({
    data: {
      id: "q0007000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Chuyển động thẳng đều là chuyển động:" },
      explanation: "Chuyển động thẳng đều là chuyển động có quỹ đạo là đường thẳng và vận tốc không đổi theo thời gian.",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0007000-0000-4000-a000-000000000007",
      difficulty: "REMEMBERING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0007001-0000-4000-a000-000000000001", content: { text: "Có quỹ đạo là đường thẳng và vận tốc không đổi" }, isCorrect: true, order: 1 },
          { id: "a0007001-0000-4000-a000-000000000002", content: { text: "Có quỹ đạo là đường thẳng và gia tốc không đổi" }, isCorrect: false, order: 2 },
          { id: "a0007001-0000-4000-a000-000000000003", content: { text: "Có quỹ đạo là đường thẳng và tiến đều" }, isCorrect: false, order: 3 },
          { id: "a0007001-0000-4000-a000-000000000004", content: { text: "Có vận tốc không đổi theo thời gian" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0007001-0000-4000-a000-000000000001",
          content: { text: "Có quỹ đạo là đường thẳng và vận tốc không đổi" }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0007000-0000-4000-a000-000000000002",
      type: "MULTIPLE_CHOICE",
      content: { text: "Chọn các phương trình đúng mô tả chuyển động thẳng đều:" },
      explanation: "Trong chuyển động thẳng đều, vận tốc không đổi theo thời gian, vị trí thay đổi đều theo thời gian, và gia tốc bằng 0.",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0007000-0000-4000-a000-000000000007",
      difficulty: "UNDERSTANDING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0007002-0000-4000-a000-000000000001", content: { text: "x = x₀ + vt" }, isCorrect: true, order: 1 },
          { id: "a0007002-0000-4000-a000-000000000002", content: { text: "v = hằng số" }, isCorrect: true, order: 2 },
          { id: "a0007002-0000-4000-a000-000000000003", content: { text: "a = 0" }, isCorrect: true, order: 3 },
          { id: "a0007002-0000-4000-a000-000000000004", content: { text: "v = v₀ + at" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0007002-0000-4000-a000-000000000001",
          content: { answers: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0007000-0000-4000-a000-000000000003",
      type: "TRUE_FALSE",
      content: { text: "Xác định tính đúng sai của các mệnh đề sau về chuyển động thẳng đều:" },
      explanation: "Chuyển động thẳng đều có vận tốc không đổi, gia tốc bằng 0, quãng đường tỷ lệ thuận với thời gian.",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0007000-0000-4000-a000-000000000007",
      difficulty: "APPLYING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0007003-0000-4000-a000-000000000001", content: { text: "Trong chuyển động thẳng đều, vận tốc trung bình bằng vận tốc tức thời" }, isCorrect: true, order: 1 },
          { id: "a0007003-0000-4000-a000-000000000002", content: { text: "Quãng đường đi được trong chuyển động thẳng đều tỷ lệ thuận với thời gian" }, isCorrect: true, order: 2 },
          { id: "a0007003-0000-4000-a000-000000000003", content: { text: "Trong chuyển động thẳng đều, gia tốc luôn bằng 0" }, isCorrect: true, order: 3 },
          { id: "a0007003-0000-4000-a000-000000000004", content: { text: "Mọi chuyển động có quỹ đạo là đường thẳng đều là chuyển động thẳng đều" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0007003-0000-4000-a000-000000000001",
          content: { statements: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0007000-0000-4000-a000-000000000004",
      type: "ESSAY",
      content: { text: "Một xe ôtô chuyển động thẳng đều với vận tốc 72 km/h. Tính quãng đường xe đi được sau 15 phút. Biểu diễn quãng đường theo thời gian bằng đồ thị và giải thích." },
      explanation: "Trong chuyển động thẳng đều, quãng đường đi được tính theo công thức s = v × t, trong đó v là vận tốc và t là thời gian.",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0007000-0000-4000-a000-000000000007",
      difficulty: "ANALYZING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      referenceAnswers: {
        create: {
          id: "ra0007004-0000-4000-a000-000000000001",
          content: { text: "Giải:\nĐổi đơn vị vận tốc: v = 72 km/h = 72 × 1000/3600 = 20 m/s\nĐổi đơn vị thời gian: t = 15 phút = 15 × 60 = 900 s\n\nTrong chuyển động thẳng đều, quãng đường đi được tính theo công thức:\ns = v × t = 20 × 900 = 18000 m = 18 km\n\nBiểu diễn quãng đường theo thời gian:\nĐồ thị s-t của chuyển động thẳng đều là một đường thẳng đi qua gốc toạ độ (nếu ban đầu vật ở gốc toạ độ) và có độ dốc bằng vận tốc v.\n\nGiải thích: Trong chuyển động thẳng đều, vận tốc không đổi theo thời gian, nên quãng đường đi được tỷ lệ thuận với thời gian. Đồ thị s-t là đường thẳng có độ dốc bằng vận tốc v." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0007000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "Hai xe A và B chuyển động thẳng đều ngược chiều nhau trên cùng một đường thẳng với vận tốc lần lượt là 36 km/h và 54 km/h. Ban đầu hai xe cách nhau 500m. Hỏi sau bao lâu hai xe gặp nhau?" },
      explanation: "Khi hai vật chuyển động ngược chiều nhau, vận tốc tương đối bằng tổng các vận tốc. Thời gian gặp nhau tính theo công thức t = s / (v₁ + v₂).",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0007000-0000-4000-a000-000000000007",
      difficulty: "EVALUATING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0007005-0000-4000-a000-000000000001", content: { text: "20 giây" }, isCorrect: true, order: 1 },
          { id: "a0007005-0000-4000-a000-000000000002", content: { text: "15 giây" }, isCorrect: false, order: 2 },
          { id: "a0007005-0000-4000-a000-000000000003", content: { text: "25 giây" }, isCorrect: false, order: 3 },
          { id: "a0007005-0000-4000-a000-000000000004", content: { text: "30 giây" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0007005-0000-4000-a000-000000000001",
          content: { text: "20 giây" }
        }
      }
    }
  });

  // =============================
  // Course: Tiếng Anh giao tiếp
  // Chapter: Chào hỏi và giới thiệu
  // Lesson: Chào hỏi cơ bản
  // =============================

  await prisma.question.create({
    data: {
      id: "q0012000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Which greeting is appropriate for formal situations?" },
      explanation: "'Good morning/afternoon/evening' is more formal than 'Hi' or 'Hey' and is appropriate for formal situations like business meetings or when meeting someone for the first time in a professional context.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0012000-0000-4000-a000-000000000012",
      difficulty: "REMEMBERING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0012001-0000-4000-a000-000000000001", content: { text: "Good morning" }, isCorrect: true, order: 1 },
          { id: "a0012001-0000-4000-a000-000000000002", content: { text: "Hey there" }, isCorrect: false, order: 2 },
          { id: "a0012001-0000-4000-a000-000000000003", content: { text: "What's up?" }, isCorrect: false, order: 3 },
          { id: "a0012001-0000-4000-a000-000000000004", content: { text: "Yo!" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0012001-0000-4000-a000-000000000001",
          content: { text: "Good morning" }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0012000-0000-4000-a000-000000000002",
      type: "MULTIPLE_CHOICE",
      content: { text: "Which of the following are common responses to 'How are you?'" },
      explanation: "When someone asks 'How are you?', common responses include 'I'm fine/good/great, thank you' or 'Not bad'. These are standard phrases used in everyday English conversations.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0012000-0000-4000-a000-000000000012",
      difficulty: "UNDERSTANDING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0012002-0000-4000-a000-000000000001", content: { text: "I'm fine, thank you." }, isCorrect: true, order: 1 },
          { id: "a0012002-0000-4000-a000-000000000002", content: { text: "Not bad, and you?" }, isCorrect: true, order: 2 },
          { id: "a0012002-0000-4000-a000-000000000003", content: { text: "I'm doing well, thanks." }, isCorrect: true, order: 3 },
          { id: "a0012002-0000-4000-a000-000000000004", content: { text: "Yes, I am." }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0012002-0000-4000-a000-000000000001",
          content: { answers: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0012000-0000-4000-a000-000000000003",
      type: "TRUE_FALSE",
      content: { text: "Determine whether the following statements about greetings are true or false:" },
      explanation: "Understanding appropriate greetings for different times of day and situations is important for effective communication in English.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0012000-0000-4000-a000-000000000012",
      difficulty: "APPLYING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0012003-0000-4000-a000-000000000001", content: { text: "'Good evening' is appropriate to use after 6 PM." }, isCorrect: true, order: 1 },
          { id: "a0012003-0000-4000-a000-000000000002", content: { text: "'Good afternoon' is typically used between 12 PM and 6 PM." }, isCorrect: true, order: 2 },
          { id: "a0012003-0000-4000-a000-000000000003", content: { text: "It's appropriate to say 'Good night' when meeting someone in the evening." }, isCorrect: false, order: 3 },
          { id: "a0012003-0000-4000-a000-000000000004", content: { text: "'Hello' can be used at any time of day in both formal and informal situations." }, isCorrect: true, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0012003-0000-4000-a000-000000000001",
          content: { statements: [true, true, false, true] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0012000-0000-4000-a000-000000000004",
      type: "ESSAY",
      content: { text: "Imagine you are meeting your new English teacher for the first time. Write a short dialogue (4-6 exchanges) between you and the teacher, including appropriate greetings and introductions." },
      explanation: "This exercise helps practice formal greetings and introductions in an academic context, which is a common scenario for language learners.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0012000-0000-4000-a000-000000000012",
      difficulty: "ANALYZING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      referenceAnswers: {
        create: {
          id: "ra0012004-0000-4000-a000-000000000001",
          content: { text: "Teacher: Good morning! Welcome to our English class. I'm Ms. Johnson.\nStudent: Good morning, Ms. Johnson. It's nice to meet you. My name is [Name].\nTeacher: It's a pleasure to meet you too, [Name]. How are you today?\nStudent: I'm doing well, thank you. I'm looking forward to your class. How are you?\nTeacher: I'm very well, thank you. Have you studied English before?\nStudent: Yes, I've been studying for about two years, but I still have a lot to learn.\nTeacher: That's great! We'll build on what you already know. Please take a seat, and we'll begin shortly.\nStudent: Thank you very much." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0012000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "Which of the following is NOT an appropriate way to end a conversation in English?" },
      explanation: "Understanding how to politely end conversations is as important as knowing how to start them. Abruptly saying 'I'm leaving now' without any farewell expression is considered impolite in most contexts.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0012000-0000-4000-a000-000000000012",
      difficulty: "EVALUATING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0012005-0000-4000-a000-000000000001", content: { text: "I'm leaving now." }, isCorrect: true, order: 1 },
          { id: "a0012005-0000-4000-a000-000000000002", content: { text: "It was nice talking to you. Goodbye!" }, isCorrect: false, order: 2 },
          { id: "a0012005-0000-4000-a000-000000000003", content: { text: "I have to go now. See you later!" }, isCorrect: false, order: 3 },
          { id: "a0012005-0000-4000-a000-000000000004", content: { text: "Take care! Have a nice day." }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0012005-0000-4000-a000-000000000001",
          content: { text: "I'm leaving now." }
        }
      }
    }
  });

  // =============================
  // Course: Tiếng Anh giao tiếp
  // Chapter: Chào hỏi và giới thiệu
  // Lesson: Giới thiệu bản thân
  // =============================

  await prisma.question.create({
    data: {
      id: "q0013000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Which of the following is the most appropriate way to introduce yourself in a formal situation?" },
      explanation: "In formal situations, it's appropriate to use your full name and provide some context about yourself, such as your role or purpose for being there.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0013000-0000-4000-a000-000000000013",
      difficulty: "REMEMBERING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0013001-0000-4000-a000-000000000001", content: { text: "Hello, my name is John Smith. I'm the new marketing manager." }, isCorrect: true, order: 1 },
          { id: "a0013001-0000-4000-a000-000000000002", content: { text: "Hi! I'm John." }, isCorrect: false, order: 2 },
          { id: "a0013001-0000-4000-a000-000000000003", content: { text: "What's up? John here." }, isCorrect: false, order: 3 },
          { id: "a0013001-0000-4000-a000-000000000004", content: { text: "Hey everyone, call me Johnny." }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0013001-0000-4000-a000-000000000001",
          content: { text: "Hello, my name is John Smith. I'm the new marketing manager." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0013000-0000-4000-a000-000000000002",
      type: "MULTIPLE_CHOICE",
      content: { text: "Which of the following information is typically included when introducing yourself in a professional context?" },
      explanation: "When introducing yourself professionally, it's common to include your name, role or position, company or organization, and sometimes a brief statement about your experience or purpose.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0013000-0000-4000-a000-000000000013",
      difficulty: "UNDERSTANDING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0013002-0000-4000-a000-000000000001", content: { text: "Your full name" }, isCorrect: true, order: 1 },
          { id: "a0013002-0000-4000-a000-000000000002", content: { text: "Your job title or role" }, isCorrect: true, order: 2 },
          { id: "a0013002-0000-4000-a000-000000000003", content: { text: "Your company or organization" }, isCorrect: true, order: 3 },
          { id: "a0013002-0000-4000-a000-000000000004", content: { text: "Your favorite hobbies" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0013002-0000-4000-a000-000000000001",
          content: { answers: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0013000-0000-4000-a000-000000000003",
      type: "TRUE_FALSE",
      content: { text: "Determine whether the following statements about self-introductions are true or false:" },
      explanation: "Understanding appropriate self-introduction etiquette is important for making good first impressions in various social and professional contexts.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0013000-0000-4000-a000-000000000013",
      difficulty: "APPLYING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0013003-0000-4000-a000-000000000001", content: { text: "You should always shake hands firmly when introducing yourself in Western business contexts." }, isCorrect: true, order: 1 },
          { id: "a0013003-0000-4000-a000-000000000002", content: { text: "It's appropriate to use only your first name when introducing yourself in a job interview." }, isCorrect: false, order: 2 },
          { id: "a0013003-0000-4000-a000-000000000003", content: { text: "Making eye contact during introductions is considered polite in most Western cultures." }, isCorrect: true, order: 3 },
          { id: "a0013003-0000-4000-a000-000000000004", content: { text: "You should always include detailed personal information when introducing yourself professionally." }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0013003-0000-4000-a000-000000000001",
          content: { statements: [true, false, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0013000-0000-4000-a000-000000000004",
      type: "ESSAY",
      content: { text: "Write a 60-80 word self-introduction for your first day at a new job, including your name, background, experience, and why you're excited about the position." },
      explanation: "This exercise helps practice creating a concise, professional self-introduction that would be appropriate in a workplace setting.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0013000-0000-4000-a000-000000000013",
      difficulty: "ANALYZING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      referenceAnswers: {
        create: {
          id: "ra0013004-0000-4000-a000-000000000001",
          content: { text: "Hello everyone, I'm Sarah Johnson, and I'm delighted to join the marketing team as the new Digital Marketing Specialist. I have a bachelor's degree in Marketing from State University and three years of experience in social media management and content creation at XYZ Company. I'm particularly skilled in analytics and SEO optimization. I'm excited to bring my expertise to this role and contribute to the company's digital growth strategy. I look forward to working with all of you and learning from your experience." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0013000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "When introducing yourself to someone from another culture, what is the most important thing to consider?" },
      explanation: "Cultural awareness is crucial when introducing yourself to people from different backgrounds. Understanding and respecting cultural differences in greetings, personal space, and communication styles helps avoid misunderstandings and shows respect.",
      courseId: "c1003000-0000-4000-a000-000000000003",
      chapterId: "c2005000-0000-4000-a000-000000000005",
      lessonId: "l0013000-0000-4000-a000-000000000013",
      difficulty: "EVALUATING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0013005-0000-4000-a000-000000000001", content: { text: "Being aware of and respecting cultural differences in greetings and communication styles" }, isCorrect: true, order: 1 },
          { id: "a0013005-0000-4000-a000-000000000002", content: { text: "Speaking slowly and loudly so they can understand you better" }, isCorrect: false, order: 2 },
          { id: "a0013005-0000-4000-a000-000000000003", content: { text: "Using complex vocabulary to show your language proficiency" }, isCorrect: false, order: 3 },
          { id: "a0013005-0000-4000-a000-000000000004", content: { text: "Telling them all about your country's customs immediately" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0013005-0000-4000-a000-000000000001",
          content: { text: "Being aware of and respecting cultural differences in greetings and communication styles" }
        }
      }
    }
  });

  // =============================
  // Course: Vật lý 10
  // Chapter: Động học chất điểm
  // Lesson: Chuyển động thẳng biến đổi đều
  // =============================

  await prisma.question.create({
    data: {
      id: "q0008000-0000-4000-a000-000000000001",
      type: "SINGLE_CHOICE",
      content: { text: "Chuyển động thẳng biến đổi đều là chuyển động:" },
      explanation: "Chuyển động thẳng biến đổi đều là chuyển động có quỹ đạo là đường thẳng và gia tốc không đổi theo thời gian.",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0008000-0000-4000-a000-000000000008",
      difficulty: "REMEMBERING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0008001-0000-4000-a000-000000000001", content: { text: "Có quỹ đạo là đường thẳng và gia tốc không đổi" }, isCorrect: true, order: 1 },
          { id: "a0008001-0000-4000-a000-000000000002", content: { text: "Có quỹ đạo là đường thẳng và vận tốc không đổi" }, isCorrect: false, order: 2 },
          { id: "a0008001-0000-4000-a000-000000000003", content: { text: "Có quỹ đạo là đường thẳng và vận tốc thay đổi đều" }, isCorrect: false, order: 3 },
          { id: "a0008001-0000-4000-a000-000000000004", content: { text: "Có gia tốc không đổi theo thời gian" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0008001-0000-4000-a000-000000000001",
          content: { text: "Có quỹ đạo là đường thẳng và gia tốc không đổi" }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0008000-0000-4000-a000-000000000002",
      type: "MULTIPLE_CHOICE",
      content: { text: "Chọn các phương trình đúng mô tả chuyển động thẳng biến đổi đều:" },
      explanation: "Trong chuyển động thẳng biến đổi đều, gia tốc không đổi, vận tốc thay đổi đều theo thời gian, và vị trí thay đổi theo hàm bậc hai của thời gian.",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0008000-0000-4000-a000-000000000008",
      difficulty: "UNDERSTANDING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0008002-0000-4000-a000-000000000001", content: { text: "v = v₀ + at" }, isCorrect: true, order: 1 },
          { id: "a0008002-0000-4000-a000-000000000002", content: { text: "x = x₀ + v₀t + (1/2)at²" }, isCorrect: true, order: 2 },
          { id: "a0008002-0000-4000-a000-000000000003", content: { text: "a = hằng số" }, isCorrect: true, order: 3 },
          { id: "a0008002-0000-4000-a000-000000000004", content: { text: "v = hằng số" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0008002-0000-4000-a000-000000000001",
          content: { answers: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0008000-0000-4000-a000-000000000003",
      type: "TRUE_FALSE",
      content: { text: "Xác định tính đúng sai của các mệnh đề sau về chuyển động thẳng biến đổi đều:" },
      explanation: "Chuyển động thẳng biến đổi đều có gia tốc không đổi, vận tốc thay đổi đều theo thời gian, và quãng đường tỷ lệ với bình phương thời gian.",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0008000-0000-4000-a000-000000000008",
      difficulty: "APPLYING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0008003-0000-4000-a000-000000000001", content: { text: "Trong chuyển động thẳng biến đổi đều, vận tốc thay đổi đều theo thời gian" }, isCorrect: true, order: 1 },
          { id: "a0008003-0000-4000-a000-000000000002", content: { text: "Trong chuyển động thẳng biến đổi đều, gia tốc luôn không đổi" }, isCorrect: true, order: 2 },
          { id: "a0008003-0000-4000-a000-000000000003", content: { text: "Trong chuyển động thẳng biến đổi đều, vận tốc trung bình bằng trung bình cộng của vận tốc đầu và vận tốc cuối" }, isCorrect: true, order: 3 },
          { id: "a0008003-0000-4000-a000-000000000004", content: { text: "Trong chuyển động thẳng biến đổi đều, quãng đường đi được tỷ lệ thuận với thời gian" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0008003-0000-4000-a000-000000000001",
          content: { statements: [true, true, true, false] }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0008000-0000-4000-a000-000000000004",
      type: "ESSAY",
      content: { text: "Một ôtô đang chạy với vận tốc 54 km/h thì hãm phanh và chuyển động chậm dần đều với gia tốc có độ lớn 3 m/s². Tính quãng đường xe đi được cho đến khi dừng hẳn và thời gian chuyển động. Vẽ đồ thị vận tốc theo thời gian." },
      explanation: "Trong chuyển động thẳng biến đổi đều, sử dụng các công thức: v = v₀ + at, s = v₀t + (1/2)at², v² = v₀² + 2as.",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0008000-0000-4000-a000-000000000008",
      difficulty: "ANALYZING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      referenceAnswers: {
        create: {
          id: "ra0008004-0000-4000-a000-000000000001",
          content: { text: "Giải:\nĐổi đơn vị vận tốc: v₀ = 54 km/h = 54 × 1000/3600 = 15 m/s\nGia tốc có độ lớn a = 3 m/s²\nVì xe chuyển động chậm dần nên gia tốc ngược chiều với vận tốc, ta có a = -3 m/s²\n\nThời gian chuyển động cho đến khi dừng hẳn:\nKhi dừng hẳn, v = 0\nSử dụng công thức v = v₀ + at\n0 = 15 + (-3)t\nt = 15/3 = 5 giây\n\nQuãng đường xe đi được:\nSử dụng công thức s = v₀t + (1/2)at²\ns = 15 × 5 + (1/2) × (-3) × 5²\ns = 75 - 37.5 = 37.5 m\n\nHoặc sử dụng công thức v² = v₀² + 2as\n0 = 15² + 2 × (-3) × s\n6s = 225\ns = 37.5 m\n\nĐồ thị vận tốc theo thời gian:\nĐồ thị v-t của chuyển động thẳng biến đổi đều là một đường thẳng. Trong trường hợp này, đường thẳng đi qua điểm (0, 15) và (5, 0), có độ dốc bằng gia tốc a = -3 m/s²." }
        }
      }
    }
  });

  await prisma.question.create({
    data: {
      id: "q0008000-0000-4000-a000-000000000005",
      type: "SINGLE_CHOICE",
      content: { text: "Một vật chuyển động thẳng nhanh dần đều với gia tốc 2 m/s². Biết vận tốc ban đầu là 5 m/s. Vận tốc của vật sau 10 giây là:" },
      explanation: "Trong chuyển động thẳng biến đổi đều, vận tốc tại thời điểm t được tính theo công thức v = v₀ + at.",
      courseId: "c1002000-0000-4000-a000-000000000002",
      chapterId: "c2003000-0000-4000-a000-000000000003",
      lessonId: "l0008000-0000-4000-a000-000000000008",
      difficulty: "EVALUATING",
      questionSetterId: "25e1d787-4ce1-4109-b8eb-a90fe40d942c",
      options: {
        create: [
          { id: "a0008005-0000-4000-a000-000000000001", content: { text: "25 m/s" }, isCorrect: true, order: 1 },
          { id: "a0008005-0000-4000-a000-000000000002", content: { text: "20 m/s" }, isCorrect: false, order: 2 },
          { id: "a0008005-0000-4000-a000-000000000003", content: { text: "15 m/s" }, isCorrect: false, order: 3 },
          { id: "a0008005-0000-4000-a000-000000000004", content: { text: "30 m/s" }, isCorrect: false, order: 4 }
        ]
      },
      referenceAnswers: {
        create: {
          id: "ra0008005-0000-4000-a000-000000000001",
          content: { text: "25 m/s" }
        }
      }
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
