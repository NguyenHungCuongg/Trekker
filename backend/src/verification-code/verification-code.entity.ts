import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("verification_codes")
export class VerificationCode {
  @PrimaryGeneratedColumn({ name: "verification_id" })
  verificationId: number;

  @Column()
  email: string;

  @Column()
  code: string;

  @Column({ name: "expires_at", type: "timestamp" })
  expiresAt: Date;

  @Column()
  verified: boolean;
}
